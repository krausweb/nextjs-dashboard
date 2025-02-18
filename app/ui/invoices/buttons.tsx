'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import Modal from '@/app/ui/modal';
import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { Trans } from 'react-i18next/TransWithoutContext';

export function CreateInvoice({ lng }: { lng: string }) {
	const { t } = useTranslation(lng, 'dashboard');
	return (
		<Link
			href={`/${lng}/dashboard/invoices/create`}
			className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			<span className="hidden md:block">{t('create-invoice')}</span> <PlusIcon title={t('create-invoice')} className="h-5 md:ml-4" />
		</Link>
	);
}

export function UpdateInvoice({ id, lng }: { id: string, lng: string }) {
	const { t } = useTranslation(lng, 'dashboard');
	return (
		<Link href={`/${lng}/dashboard/invoices/${id}/edit`}
			className="rounded-md border p-2 hover:bg-gray-100"
			title={t('edit')}
		>
			<PencilIcon className="w-5" />
		</Link>
	);
}

export function DeleteInvoice({ id, name, amount, lng }: { id: string, name: string, amount: string, lng: string }) {
	const deleteInvoiceWithId = deleteInvoice.bind(null, id, lng);
	const { t } = useTranslation(lng, 'dashboard');
	const [show, setShow] = useState(false);

	const modalContext = (
		<Trans i18nKey="areYouSureYouWantToDeleteInvoice" t={t} values={{ name, amount }}>
			Are you sure you want to delete {name} with amout <strong>{amount}</strong>?
		</Trans>
	);

	return (
		<div>
			<Modal isOpen={show}
				body={modalContext}
				header={t('delete')}
				lng={lng}
				actionParentFunction={() => deleteInvoiceWithId()}
			/>

			<form
				action={(e) => {
					setShow(true);
				}}
			>
				<button className="rounded-md border p-2 hover:bg-gray-100"
					title={t('delete')}
					type="submit"
				>
					<span className="sr-only">{t('delete')}</span>
					<TrashIcon className="w-5" />
				</button>
			</form>
		</div>
	);
}
