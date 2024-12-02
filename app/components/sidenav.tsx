import NavLinks from "@/app/ui/nav-links";

const links = [
	{ name: 'Components', href: '/components' },
	{ name: 'Testpages', href: '/components/testpages' },
	{ name: 'Redux Counter', href: '/components/counter' },
];

export default function Sidenav(){
	return (
		<nav className="flex flex-col px-3 py-4 md:px-2">
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks links={links} />
			</div>
		</nav>
	);
}
