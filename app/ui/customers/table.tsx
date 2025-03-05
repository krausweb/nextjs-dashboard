import Image from 'next/image';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { DeleteCustomer, UpdateCustomer } from './buttons';
import { serverTranslation } from '@/app/i18n';
import { Trans } from 'react-i18next/TransWithoutContext'
import * as motion from "motion/react-client" // motion name notation for the Server component

type CustomerTableType = {
	query: string,
	currentPage: number,
	lng: string
};

export default async function CustomersTable({ query, currentPage, lng }: CustomerTableType) {
	const customers = await fetchFilteredCustomers(query, currentPage);
	const { t } = await serverTranslation(lng, 'dashboard');

	return (
		<div className="w-full">
			<div className="mt-6 flow-root">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden rounded-md bg-gray-100 p-2 md:pt-0">
							<div className="md:hidden">
								{customers?.map(({ id, image_url, name, email, total_pending, total_paid, total_invoices }) => (
									<motion.div
										initial={{ y: 100, opacity: 0 }}
										whileInView={{ y: 0, opacity: 1 }}
										transition={{
											duration: 0.5,
											delay: 0.2,
											type: "spring",
											stiffness: 100,
										}}
										key={id} className="mb-2 w-full rounded-md bg-white p-4">
										<div className="flex items-center justify-between border-b pb-4">
											<div>
												<div className="mb-2 flex items-center">
													<div className="flex items-center gap-3">
														<Image
															src={image_url}
															className="rounded-full"
															alt={name.slice(0, 3)}
															width={28}
															height={28}
														/>
														<p>{name}</p>
													</div>
												</div>
												<p className="text-sm text-gray-500">{email}</p>
											</div>
										</div>
										<div className="flex w-full items-center justify-between border-b py-5">
											<div className="flex w-1/2 flex-col">
												<p className="text-xs">{t('total-pending')}</p>
												<p className="font-medium">{total_pending}</p>
											</div>
											<div className="flex w-1/2 flex-col">
												<p className="text-xs">{t('total-paid')}</p>
												<p className="font-medium">{total_paid}</p>
											</div>
										</div>
										<div className="flex w-full items-center justify-between pt-4">
											<p>
												<Trans i18nKey="totalInvoices" t={t} values={{ total_invoices }}>
													{total_invoices} invoices
												</Trans>
											</p>
											<div className="flex justify-end gap-2">
												<UpdateCustomer id={id} lng={lng} />
												<DeleteCustomer id={id} name={name} lng={lng} />
											</div>
										</div>
									</motion.div>
								))}
							</div>
							<table className="hidden min-w-full rounded-md text-gray-900 md:table">
								<thead className="rounded-md bg-gray-100 text-left text-sm font-normal">
									<tr>
										<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
											{t('name')}
										</th>
										<th scope="col" className="px-3 py-5 font-medium">
											{t('email')}
										</th>
										<th scope="col" className="px-3 py-5 font-medium">
											{t('total-invoices')}
										</th>
										<th scope="col" className="px-3 py-5 font-medium">
											{t('total-pending')}
										</th>
										<th scope="col" className="px-4 py-5 font-medium">
											{t('total-paid')}
										</th>
										<th scope="col" className="px-4 py-5 font-medium"></th>
									</tr>
								</thead>

								<tbody className="divide-y divide-gray-200 text-gray-900">
									{customers.map((customer) => (
										<motion.tr
											initial={{ y: 100, opacity: 0 }}
											whileInView={{ y: 0, opacity: 1 }}
											transition={{
												duration: 0.5,
												delay: 0.2,
												type: "spring",
												stiffness: 100,
											}}
											key={customer.id} className="group"
										>
											<td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
												<div className="flex items-center gap-3">
													<Image
														src={customer.image_url}
														className="rounded-full"
														alt={customer.name.slice(0, 3)}
														width={28}
														height={28}
													/>
													<p>{customer.name}</p>
												</div>
											</td>
											<td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
												{customer.email}
											</td>
											<td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
												{customer.total_invoices}
											</td>
											<td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
												{customer.total_pending}
											</td>
											<td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
												{customer.total_paid}
											</td>
											<td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
												<div className="flex justify-end gap-3">
													<UpdateCustomer id={customer.id} lng={lng} />
													<DeleteCustomer id={customer.id} name={customer.name} lng={lng} />
												</div>
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
}
