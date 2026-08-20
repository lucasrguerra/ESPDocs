import Link from "next/link";
import {
	AlertTriangle,
	ArrowDownToLine,
	HardDrive,
	Power,
	Bug,
	Usb,
	Zap,
	ArrowRight,
} from "lucide-react";

/**
 * Restrições de pinos por série.
 *
 * Os grupos são DERIVADOS de public/conexoes/<serie>.json, o mesmo arquivo que
 * alimenta o diagrama de conexões. Nada aqui é escrito à mão, então a seção e o
 * diagrama nunca divergem: corrigir um pino no JSON corrige os dois.
 */

const GRUPOS = [
	{
		id: "entrada",
		titulo: "Somente entrada",
		icone: ArrowDownToLine,
		cor: "text-sky-500",
		explicacao:
			"Aceitam apenas leitura. Não podem ser configurados como saída e não possuem resistores de pull-up ou pull-down internos. Se precisar de um, coloque no circuito.",
		combina: (avisos) => /apenas de entrada|input only/.test(avisos),
	},
	{
		id: "flash",
		titulo: "Ligados à memória flash/PSRAM",
		icone: HardDrive,
		cor: "text-rose-500",
		explicacao:
			"Já estão conectados à memória de onde o firmware é lido. Usá-los como GPIO comum normalmente trava o chip ou corrompe a execução. Em módulos com flash interna eles nem chegam ao encapsulamento.",
		combina: (avisos) =>
			/(flash|psram)/.test(avisos) &&
			/(dedicad|utilizado pela mem|não deve ser utilizado|não é recomendado)/.test(avisos),
	},
	{
		id: "strapping",
		titulo: "Strapping (modo de boot)",
		icone: Power,
		cor: "text-amber-500",
		explicacao:
			"O chip lê o nível destes pinos no instante do reset para decidir como inicializar. Dá para usá-los depois do boot, mas o circuito externo não pode forçar o nível errado durante o reset, senão a placa não inicia ou entra em modo de gravação sozinha.",
		combina: (avisos, cats) =>
			cats.includes("Strapping") ||
			/strapping|modo de boot|modo de inicialização/.test(avisos),
	},
	{
		id: "debug",
		titulo: "Gravação e depuração",
		icone: Bug,
		cor: "text-violet-500",
		explicacao:
			"São a UART de gravação e as linhas de JTAG. Continuam utilizáveis como GPIO, mas ao reaproveitá-los você perde o caminho de gravar e depurar a placa sem desconectar o que estiver ali.",
		combina: (avisos, cats) => /debugging/.test(avisos) || cats.includes("JTAG"),
	},
	{
		id: "usb",
		titulo: "USB nativo",
		icone: Usb,
		cor: "text-teal-500",
		explicacao:
			"Saem de fábrica ligados ao USB Serial/JTAG interno. Para usá-los como GPIO é preciso desativar essa função, o que também remove a gravação por USB direto.",
		combina: (avisos) => /usb serial\/jtag|usb_d[+-]/.test(avisos),
	},
	{
		id: "eletrico",
		titulo: "Não podem ficar flutuando",
		icone: Zap,
		cor: "text-orange-500",
		explicacao:
			"Precisam de nível definido por hardware: pull-up externo ou circuito RC de atraso. Deixá-los soltos causa reset aleatório ou inicialização instável.",
		combina: (avisos) => /flutuando/.test(avisos),
	},
];

/** Nome do pino + o GPIO correspondente, quando o nome é uma função (ex.: SENSOR_VP). */
function rotuloDoPino(pino) {
	const gpio = (pino.funcoes || []).find((f) => /^GPIO\d+$/.test(f));
	return gpio && gpio !== pino.nome ? `${pino.nome} · ${gpio}` : pino.nome;
}

function derivarGrupos(conexoes) {
	return GRUPOS.map((grupo) => {
		const vistos = new Map();
		for (const pino of conexoes) {
			if (!["io", "analog", "dedicated"].includes(pino.tipo)) continue;
			const avisos = (pino.avisos || []).join(" ").toLowerCase();
			const cats = pino.categorias || [];
			if (grupo.combina(avisos, cats)) {
				const rotulo = rotuloDoPino(pino);
				if (!vistos.has(rotulo)) vistos.set(rotulo, pino);
			}
		}
		return { ...grupo, pinos: [...vistos.keys()] };
	}).filter((g) => g.pinos.length > 0);
}

export default function PinRestrictions({ conexoes, serieKey, cor }) {
	if (!conexoes?.length) return null;

	const grupos = derivarGrupos(conexoes);
	if (!grupos.length) return null;

	const totalPinos = new Set(grupos.flatMap((g) => g.pinos)).size;

	return (
		<div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-300 dark:border-slate-800/80 shadow-2xl mb-12">
			<h2 className="text-xl font-bold text-slate-850 dark:text-slate-100 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800/65 flex items-center gap-3">
				<AlertTriangle className="w-5 h-5" style={{ color: cor }} />
				<span>Pinos com Restrição de Uso</span>
			</h2>

			<p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed mb-8">
				Nem todo pino do {serieKey} está livre para uso geral. {totalPinos} deles têm alguma
				condição: já estão ocupados por memória, são lidos durante o boot ou só funcionam
				como entrada. Vale conferir antes de fechar o esquemático.
			</p>

			<div className="grid md:grid-cols-2 gap-5">
				{grupos.map(({ id, titulo, icone: Icone, cor: corIcone, explicacao, pinos }) => (
					<div
						key={id}
						className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800/60"
					>
						<div className="flex items-center gap-2.5 mb-3">
							<Icone className={`w-4 h-4 shrink-0 ${corIcone}`} />
							<h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{titulo}</h3>
							<span className="ml-auto text-[10px] font-bold text-slate-500 dark:text-slate-400 tabular">
								{pinos.length} {pinos.length === 1 ? "pino" : "pinos"}
							</span>
						</div>

						<div className="flex flex-wrap gap-1.5 mb-3.5">
							{pinos.map((p) => (
								<span
									key={p}
									className="px-2 py-1 rounded-lg text-[10px] font-bold font-mono"
									style={{
										backgroundColor: `${cor}18`,
										color: cor,
										border: `1px solid ${cor}30`,
									}}
								>
									{p}
								</span>
							))}
						</div>

						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
							{explicacao}
						</p>
					</div>
				))}
			</div>

			<div className="mt-7 pt-6 border-t border-slate-200 dark:border-slate-800/65 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
					Estes grupos vêm dos mesmos dados do diagrama de conexões. Lá você vê pino a pino
					todas as funções, o domínio de alimentação e os avisos completos de cada um.
				</p>
				<Link
					href="#connections"
					className="inline-flex items-center justify-center gap-2 shrink-0 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-90"
					style={{ backgroundColor: cor }}
				>
					<span>Abrir diagrama de pinos</span>
					<ArrowRight className="w-4 h-4" />
				</Link>
			</div>
		</div>
	);
}
