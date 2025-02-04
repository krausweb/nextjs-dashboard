import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import type { Metadata } from 'next';
import { StoreProvider } from "./StoreProvider";

export const metadata: Metadata = {
	title: {
		template: '%s | Acme Dashboard',
		default: 'Acme Dashboard',
	},
	description: 'The official Next.js Course Dashboard, built with App Router.',
	metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<html lang="en">
				<body className={`${inter.className} antialiased`}>
					{children}
					<div id="modal" />
				</body>
			</html>
		</StoreProvider>
	);
}
