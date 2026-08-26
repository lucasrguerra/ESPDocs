import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const svgPath = fs.existsSync(path.resolve('public/icon.svg'))
	? path.resolve('public/icon.svg')
	: fs.existsSync(path.resolve('app/icon.svg'))
	? path.resolve('app/icon.svg')
	: path.resolve('public/marca/espdocs-marca.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

function createIco(pngBuffers) {
	// pngBuffers: array of { width, height, buffer }
	const count = pngBuffers.length;
	const headerSize = 6;
	const dirEntrySize = 16;
	let offset = headerSize + dirEntrySize * count;

	const header = Buffer.alloc(headerSize);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // ICO type
	header.writeUInt16LE(count, 4); // count

	const entries = [];
	for (const img of pngBuffers) {
		const entry = Buffer.alloc(dirEntrySize);
		entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
		entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
		entry.writeUInt8(0, 2); // colors
		entry.writeUInt8(0, 3); // reserved
		entry.writeUInt16LE(1, 4); // planes
		entry.writeUInt16LE(32, 6); // bpp
		entry.writeUInt32LE(img.buffer.length, 8); // size
		entry.writeUInt32LE(offset, 12); // offset
		entries.push(entry);
		offset += img.buffer.length;
	}

	return Buffer.concat([header, ...entries, ...pngBuffers.map(b => b.buffer)]);
}

async function run() {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	const page = await browser.newPage();

	const html = `<!DOCTYPE html>
	<html>
	<head>
		<style>
			* { margin: 0; padding: 0; box-sizing: border-box; }
			html, body { width: 100%; height: 100%; overflow: hidden; background: transparent; }
			svg { width: 100%; height: 100%; display: block; }
		</style>
	</head>
	<body>${svgContent}</body>
	</html>`;

	await page.setContent(html);

	const sizes = [16, 32, 48, 96, 180, 192, 512];
	const rendered = {};

	for (const size of sizes) {
		await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
		const buffer = await page.screenshot({
			type: 'png',
			omitBackground: true,
			clip: { x: 0, y: 0, width: size, height: size }
		});
		rendered[size] = buffer;
		console.log(`Rendered ${size}x${size}`);
	}

	await browser.close();

	// Create ICO from 16, 32, 48
	const icoBuffer = createIco([
		{ width: 16, height: 16, buffer: rendered[16] },
		{ width: 32, height: 32, buffer: rendered[32] },
		{ width: 48, height: 48, buffer: rendered[48] }
	]);

	// Write favicon.ico to public
	fs.writeFileSync('public/favicon.ico', icoBuffer);
	console.log('Saved favicon.ico to public/');

	// Write PNG favicons to public
	fs.writeFileSync('public/favicon-48x48.png', rendered[48]);
	fs.writeFileSync('public/favicon-32x32.png', rendered[32]);
	fs.writeFileSync('public/favicon-16x16.png', rendered[16]);
	fs.writeFileSync('public/apple-touch-icon.png', rendered[180]);
	fs.writeFileSync('public/icon-192.png', rendered[192]);
	fs.writeFileSync('public/icon-512.png', rendered[512]);
	console.log('Saved PNG icons to public/');

	// Create site.webmanifest
	const manifest = {
		name: "ESPDocs",
		short_name: "ESPDocs",
		description: "Documentação do ecossistema ESP32 em português brasileiro",
		start_url: "/",
		display: "standalone",
		background_color: "#020617",
		theme_color: "#8b5cf6",
		icons: [
			{
				src: "/favicon-48x48.png",
				sizes: "48x48",
				type: "image/png"
			},
			{
				src: "/icon-192.png",
				sizes: "192x192",
				type: "image/png"
			},
			{
				src: "/icon-512.png",
				sizes: "512x512",
				type: "image/png"
			}
		]
	};

	fs.writeFileSync('public/site.webmanifest', JSON.stringify(manifest, null, 2));
	console.log('Saved site.webmanifest to public/');
}

run().catch(err => {
	console.error(err);
	process.exit(1);
});
