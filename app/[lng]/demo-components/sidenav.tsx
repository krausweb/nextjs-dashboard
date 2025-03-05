import NavLinks from "@/app/ui/nav-links";

const links = [
	{ name: 'Components', href: '/en/demo-components' },
	{ name: 'Redux Counter Official', href: '/en/demo-components/redux-counter-official' },
	{ name: 'Redux Counter Community', href: '/en/demo-components/redux-counter-community' },
	{ name: 'Redux Dashboard Customers', href: '/en/demo-components/redux-dashboard-customers' },
	{ name: 'Zustand Client Component', href: '/en/demo-components/zustand' },
	{ name: 'React Window', href: '/en/demo-components/react-window' },
];

const links2 = [
	{ name: 'Testpages', href: '/en/demo-components/testpages' },
]

const links3 = [
	{ name: 'Dashboard', href: '/en/dashboard' },
];

export default function Sidenav() {
	return (
		<nav className="flex h-full flex-col px-3 py-4 md:px-2">
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks links={links} />
				<div className="h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
				<NavLinks links={links2} />
				<div className="h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
				<NavLinks links={links3} />
			</div>
		</nav>
	);
}
