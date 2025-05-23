'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createCustomer, StateCustomer } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import TiptapRichTextEditor from '@/app/ui/tiptap';

type FormType = {
	lng: string
}

export default function Form({ lng }: FormType) {
	const initialState: StateCustomer = {
		message: null,
		errors: {},
	};
	const createCustomerWithData = createCustomer.bind(null, lng);
	const [state, formAction] = useActionState(createCustomerWithData, initialState);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [image_url, setImageUrl] = useState('');
	const [description, setDescription] = useState('');
	const { t } = useTranslation(lng, 'dashboard');

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-100 p-4 md:p-6">
				{/* Customer Name */}
				<div className="mb-4">
					<label htmlFor="name" className="mb-2 block text-sm font-medium">
						{t('customer-name')}
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="name"
								name="name"
								type="text"
								defaultValue={name}
								onChange={(e) => setName(e.target.value)}
								placeholder={t('enter-customer-name')}
								className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="name-error"
							/>
						</div>
						<div id="name-error" aria-live="polite" aria-atomic="true">
							{Array.isArray(state.errors?.name) &&
								state.errors.name.map((error: string) => (
									<p className="mt-2 text-sm text-red-500" key={error}>
										{t(error)}
									</p>
								))}
						</div>
					</div>
				</div>

				{/* Customer Email */}
				<div className="mb-4">
					<label htmlFor="email" className="mb-2 block text-sm font-medium">
						{t('customer-email')}
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="email"
								name="email"
								type="text"
								defaultValue={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder={t('enter-customer-email')}
								className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="email-error"
							/>
						</div>
						<div id="email-error" aria-live="polite" aria-atomic="true">
							{Array.isArray(state.errors?.email) &&
								state.errors.email.map((error: string) => (
									<p className="mt-2 text-sm text-red-500" key={error}>
										{t(error)}
									</p>
								))}
						</div>
					</div>
				</div>

				{/* Customer Image */}
				<div className="mb-4">
					<label htmlFor="image_url" className="mb-2 block text-sm font-medium">
						{t('customer-image')}
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="image_url"
								name="image_url"
								type="text"
								defaultValue={image_url}
								onChange={(e) => setImageUrl(e.target.value)}
								placeholder={t('enter-customer-image-url')}
								className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="image_url-error"
							/>
						</div>
						<div id="image_url-error" aria-live="polite" aria-atomic="true">
							{Array.isArray(state.errors?.image_url) &&
								state.errors.image_url.map((error: string) => (
									<p className="mt-2 text-sm text-red-500" key={error}>
										{t(error)}
									</p>
								))}
						</div>
					</div>
				</div>

				{/* Customer Description */}
				<div className="mb-4"				>
					<label htmlFor="description" className="mb-2 block text-sm font-medium">
						{t('customer-description')}
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<TiptapRichTextEditor content={description} updateContent={(value) => setDescription(value)} />
							<input
								type="hidden"
								id="description"
								name="description"
								defaultValue={description}
							/>
						</div>
					</div>
				</div>

			</div>

			{state.message && (
				<div aria-live="polite" aria-atomic="true">
					<p className="mt-2 text-sm text-red-500">{t(state.message)}</p>
				</div>
			)}

			<div className="mt-6 flex justify-end gap-4">
				<Link
					href={`/${lng}/dashboard/customers`}
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					{t('cancel')}
				</Link>
				<Button type="submit">{t('create-customer')}</Button>
			</div>
		</form>
	);
}
