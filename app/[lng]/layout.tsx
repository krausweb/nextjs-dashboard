import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import type { Metadata } from 'next';
import { StoreProvider } from "./StoreProvider";

import { dir } from 'i18next'
import { languages } from '@/app/i18n/settings';

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }))
}

export const metadata: Metadata = {
	title: {
		template: '%s | Acme Dashboard',
		default: 'Acme Dashboard',
	},
	description: 'The official Next.js Course Dashboard, built with App Router.'	
};

export default async function RootLayout(props: {
	children: React.ReactNode,
	params: Promise<{ lng: string }>,
}) {
	const { lng } = await props.params;
	const children = props.children;

	return (
		<StoreProvider>			
			<html lang={lng} dir={dir(lng)}>
				<body className={`${inter.className} antialiased`}>
					{children}
					<div id="modal" />
				</body>
			</html>
		</StoreProvider>
	);
}
