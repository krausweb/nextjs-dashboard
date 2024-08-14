import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Customer Create',
};

export default async function Page() {
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: 'Customer',
						href: '/dashboard/customers',
					},
					{
						label: 'Create Customer',
						href: '/dashboard/customer/create',
						active: true,
					},
				]}
			/>
			<Form />
		</main>
	);
}
