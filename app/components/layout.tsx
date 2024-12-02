import type { Metadata } from 'next';
import Sidenav from '@/app/components/sidenav';

export const metadata: Metadata = {
	title: 'Components'
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<section className="w-full flex-none md:w-64">
				<Sidenav />
			</section>
			<div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
		</main >
	);
}

