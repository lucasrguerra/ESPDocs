import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const modulo = searchParams.get("modulo") || "1";

	const publicDir = path.resolve(process.cwd(), "public/formacoes", modulo);
	const htmlFile = path.join(publicDir, "index.html");

	if (!fs.existsSync(htmlFile)) {
		return NextResponse.json(
			{ error: `Módulo ${modulo} não encontrado.` },
			{ status: 404 }
		);
	}

	const tmpDir = os.tmpdir();
	const tmpRgbPdf = path.join(tmpDir, `espdocs-mod-${modulo}-${Date.now()}-rgb.pdf`);
	const tmpCmykPdf = path.join(tmpDir, `espdocs-mod-${modulo}-${Date.now()}-cmyk.pdf`);

	let browser = null;
	try {
		browser = await puppeteer.launch({
			headless: "new",
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-web-security",
				"--allow-file-access-from-files"
			]
		});

		const page = await browser.newPage();
		await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
		await page.goto(`file://${htmlFile}`, { waitUntil: "networkidle0", timeout: 60000 });

		// Aguarda o Paged.js concluir a montagem
		await page.waitForFunction(() => {
			const pages = document.querySelectorAll(".pagedjs_page");
			return pages.length > 0 && !document.querySelector(".aviso-carregando");
		}, { timeout: 30000 });

		await new Promise((r) => setTimeout(r, 1000));

		await page.pdf({
			path: tmpRgbPdf,
			format: "A4",
			printBackground: true,
			preferCSSPageSize: true,
			margin: { top: 0, right: 0, bottom: 0, left: 0 }
		});

		await browser.close();
		browser = null;

		// Converte para CMYK (DeviceCMYK / ISO Coated)
		const gsCmd = `gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK -dCompatibilityLevel=1.4 -sOutputFile="${tmpCmykPdf}" "${tmpRgbPdf}"`;
		execSync(gsCmd, { stdio: "pipe" });

		const pdfBuffer = fs.readFileSync(tmpCmykPdf);

		return new NextResponse(pdfBuffer, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="LASER-ESP32-Modulo-${modulo}-CMYK.pdf"`,
				"Content-Length": pdfBuffer.length.toString()
			}
		});
	} catch (error) {
		console.error("Erro na conversão CMYK:", error);
		return NextResponse.json(
			{ error: "Falha ao gerar PDF CMYK", details: error.message },
			{ status: 500 }
		);
	} finally {
		if (browser) await browser.close();
		if (fs.existsSync(tmpRgbPdf)) fs.unlinkSync(tmpRgbPdf);
		if (fs.existsSync(tmpCmykPdf)) fs.unlinkSync(tmpCmykPdf);
	}
}

export async function POST(request) {
	try {
		const formData = await request.formData();
		const file = formData.get("pdf");

		if (!file) {
			return NextResponse.json({ error: "Nenhum arquivo PDF enviado." }, { status: 400 });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const tmpDir = os.tmpdir();
		const inputPath = path.join(tmpDir, `input-${Date.now()}.pdf`);
		const outputPath = path.join(tmpDir, `cmyk-${Date.now()}.pdf`);

		fs.writeFileSync(inputPath, buffer);

		// Converte com Ghostscript
		const gsCmd = `gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK -dCompatibilityLevel=1.4 -sOutputFile="${outputPath}" "${inputPath}"`;
		execSync(gsCmd, { stdio: "pipe" });

		const outputBuffer = fs.readFileSync(outputPath);

		// Limpa temporários
		if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
		if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

		return new NextResponse(outputBuffer, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="documento-CMYK.pdf"`,
				"Content-Length": outputBuffer.length.toString()
			}
		});
	} catch (error) {
		console.error("Erro ao converter PDF POST:", error);
		return NextResponse.json(
			{ error: "Erro ao converter PDF para CMYK", details: error.message },
			{ status: 500 }
		);
	}
}
