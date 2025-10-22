import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Sobre() {
    return (
        <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            <Header />

            <main className="px-4 pt-16 pb-20 max-w-5xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-gray-100">
                    <div className="mb-6">
                        <Link href="/" className="text-sm text-blue-600 hover:underline">← Voltar</Link>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Sobre o ESPDocs
                    </h1>

                    <p className="text-lg text-gray-700 mb-4">
                        O ESPDocs nasceu da paixão por explorar o potencial dos microcontroladores ESP32 e da vontade de compartilhar conhecimento de forma acessível e colaborativa. Criado por um entusiasta e desenvolvedor com mais de quatro anos de experiência prática com a plataforma, o projeto tem como propósito reunir, organizar e traduzir informações técnicas — muitas vezes dispersas — em um só lugar.
                    </p>

                    <p className="text-lg text-gray-700 mb-4">
                        Mais do que uma simples documentação não oficial, o ESPDocs é um espaço vivo de aprendizado. Aqui, cada detalhe sobre o hardware, frameworks, protocolos e boas práticas de desenvolvimento é tratado com cuidado e clareza, para que qualquer pessoa — do iniciante ao profissional — possa compreender e aplicar.
                    </p>

                    <p className="text-lg text-gray-700 mb-4">
                        A iniciativa surgiu com um foco especial na comunidade brasileira, que cresce e se destaca no cenário da eletrônica e IoT. O objetivo é facilitar o acesso ao conhecimento técnico em português, incentivar a experimentação e fortalecer a troca de experiências entre desenvolvedores, estudantes e pesquisadores.
                    </p>

                    <p className="text-lg text-gray-700 mb-4">
                        O ESPDocs é, acima de tudo, uma homenagem à curiosidade e ao espírito colaborativo que impulsionam a inovação.
                    </p>

                    <p className="text-lg text-gray-800 font-semibold mt-6">
                        ESPDocs — Documentando o futuro da IoT, em código aberto e em português.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}