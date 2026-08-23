import { SITE } from "@/lib/seo";

/**
 * robots.txt. O essencial aqui é apontar o sitemap: é assim que o Google
 * descobre as páginas de série sem depender de rastrear link por link.
 */
export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				// A rota de API só serve ao marketplace e não tem conteúdo indexável.
				disallow: ["/api/"],
			},
		],
		sitemap: `${SITE.url}/sitemap.xml`,
		host: SITE.url,
	};
}
