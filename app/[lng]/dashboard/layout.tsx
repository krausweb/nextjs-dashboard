import SideNav from '@/app/ui/dashboard/sidenav';

export const experimental_ppr = true;

type LanguageType = {
	lng: string
}

export default async function Layout(props: {
	children: React.ReactNode,
	params: Promise<LanguageType>,
}) {
	const { lng } = await props.params;
	const children = props.children;

	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<section className="w-full flex-none md:w-64">
				<SideNav lng={lng} />
			</section>
			<main className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</main>
		</div>
	);
}
