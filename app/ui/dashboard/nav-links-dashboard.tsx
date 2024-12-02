'use client';

import {
	UserGroupIcon,
	HomeIcon,
	DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/nav-links';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: 'Home', href: '/dashboard', icon: HomeIcon },
	{ name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
	{ name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinksDashboard() {
	return <NavLinks links={links} />;
}
