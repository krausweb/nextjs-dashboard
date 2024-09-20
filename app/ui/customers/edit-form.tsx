'use client';

import { CustomerForm } from '@/app/lib/definitions';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/app/ui/button';
import { updateCustomer, StateCustomer } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function EditInvoiceForm({ customer }: { customer: CustomerForm }) {
	const initialState: StateCustomer = {
		message: null,
		errors: {},
	};
	const { id } = customer;

	const [name, setName] = useState(customer.name);
	const [email, setEmail] = useState(customer.email);
	const [image_url, setImageUrl] = useState(customer.image_url);

	const handleImageUrlChange = useDebouncedCallback((e) => {
		if (e.target.value === '' || /\s/.test(e.target.value)) return;

		setImageUrl(e.target.value);
	}, 3000);

	const updateCustomerWithId = updateCustomer.bind(null, id);
	const [state, formAction] = useActionState(updateCustomerWithId, initialState);

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Customer Name */}
				<div className="mb-4">
					<label htmlFor="name" className="mb-2 block text-sm font-medium">
						Customer Name
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="name"
								name="name"
								type="text"
								defaultValue={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Enter Customer Name"
								className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="name-error"
							/>
						</div>
						<div id="name-error" aria-live="polite" aria-atomic="true">
							{Array.isArray(state.errors?.name) &&
								state.errors.name.map((error: string) => (
									<p className="mt-2 text-sm text-red-500" key={error}>
										{error}
									</p>
								))}
						</div>
					</div>
				</div>

				{/* Customer Email */}
				<div className="mb-4">
					<label htmlFor="name" className="mb-2 block text-sm font-medium">
						Customer Email
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="email"
								name="email"
								type="text"
								defaultValue={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter Customer Email"
								className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="email-error"
							/>
						</div>
						<div id="email-error" aria-live="polite" aria-atomic="true">
							{Array.isArray(state.errors?.email) &&
								state.errors.email.map((error: string) => (
									<p className="mt-2 text-sm text-red-500" key={error}>
										{error}
									</p>
								))}
						</div>
					</div>
				</div>

				{/* Customer Image */}
				<div className="mb-4">
					<label htmlFor="image_url" className="mb-2 block text-sm font-medium">
						<div className="flex w-40 items-center justify-between">
							<span>Customer Image</span>
							<Image
								src={image_url}
								className="rounded-full"
								alt={`${name}'s picture`}
								width={28}
								height={28}
							/>
						</div>
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="image_url"
								name="image_url"
								type="text"
								defaultValue={image_url}
								onChange={(e) => handleImageUrlChange(e)}
								placeholder="Enter Customer Image URL"
								className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="image_url-error"
							/>
						</div>
						<div id="image_url-error" aria-live="polite" aria-atomic="true">
							{Array.isArray(state.errors?.image_url) &&
								state.errors.image_url.map((error: string) => (
									<p className="mt-2 text-sm text-red-500" key={error}>
										{error}
									</p>
								))}
						</div>
					</div>
				</div>
			</div>

			{state.message && (
				<div aria-live="polite" aria-atomic="true">
					<p className="mt-2 text-sm text-red-500">{state.message}</p>
				</div>
			)}

			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/customers"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Edit Customer</Button>
			</div>
		</form>
	);
}
