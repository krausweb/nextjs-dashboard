/** @type {import('next').NextConfig} */

const nextConfig = {
	experimental: {
		ppr: 'incremental',
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				// pathname: '/account123/**',
			},
		],
	},
};

export default nextConfig;
