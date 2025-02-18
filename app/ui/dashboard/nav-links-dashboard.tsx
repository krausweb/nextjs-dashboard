'use client';

import {
	UserGroupIcon,
	HomeIcon,
	DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/nav-links';
import { useTranslation } from '@/app/i18n/client';

type LanguageType = {
	lng: string
};

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export default function NavLinksDashboard({ lng }: LanguageType) {
	const { t } = useTranslation(lng, 'dashboard');

	const links = [
		{ name: t('home'), href: `/${lng}/dashboard`, icon: HomeIcon },
		{ name: t('invoices'), href: `/${lng}/dashboard/invoices`, icon: DocumentDuplicateIcon },
		{ name: t('customers'), href: `/${lng}/dashboard/customers`, icon: UserGroupIcon },
	];
	return <NavLinks links={links} />;
}
