import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<div className="w-full flex-none md:w-64 p-6 md:p-12">
				<Link href="/">Go Home</Link>
			</div>
			<div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
		</main>
	);
}
