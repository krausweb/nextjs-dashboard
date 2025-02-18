import NavLinks from "@/app/ui/nav-links";

const links = [
	{ name: 'Components', href: '/en/components' },
	{ name: 'Redux Counter Official', href: '/en/components/redux-counter-official' },
	{ name: 'Redux Counter Community', href: '/en/components/redux-counter-community' },
	{ name: 'Redux Dashboard Customers', href: '/en/components/redux-dashboard-customers' },
];

const links2 = [
	{ name: 'Testpages', href: '/en/components/testpages' },
]

const links3 = [
	{ name: 'Dashboard', href: '/en/dashboard' },
];

export default function Sidenav() {
	return (
		<nav className="flex h-full flex-col px-3 py-4 md:px-2">
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks links={links} />
				<div className="h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
				<NavLinks links={links2} />
				<div className="h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
				<NavLinks links={links3} />
			</div>
		</nav>
	);
}
