"use client";

export default function Footer() {
    return (
        <footer className="bg-white py-3 text-black border-t border-gray-300 space-y-2">
            <div className="text-center leading-5 text-sm md:flex md:justify-between max-w-5xl mx-auto">
                <div className="m-0 p-0">
                    © {new Date().getFullYear()}&nbsp;
                    <a
                        href="https://cienciaembarcada.com.br"
                        className="text-blue-700 font-semibold hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ciência Embarcada
                    </a>
                    . Todos os direitos reservados.
                </div>

                <div className="m-0 p-0">
                    Desenvolvido por&nbsp;
                    <a
                        href="https://linkedin.com/in/lucasrguerra"
                        className="text-blue-700 font-semibold hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Lucas Rayan Guerra
                    </a>
                    .
                </div>
            </div>
        </footer>
    );
}