/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"@mui/material",
			"@mui/icons-material",
			"framer-motion",
		],
	},
	images: {
		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
