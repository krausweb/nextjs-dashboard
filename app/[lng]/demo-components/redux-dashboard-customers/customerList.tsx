import fetchCustomers from "@/app/lib/features/redux/dashboard/dashboardAPI";

export default async function CustomerList() {
	const customerList = await fetchCustomers();

	return (
		<section className="dark:text-white">
			<h2 className="text-xl font-bold my-4">Customers Table. Fetch data from DB</h2>
			{customerList.map((customer) => (
				<div className="border border-gray-200 p-4 mb-4" key={customer.id}>
					<div>{customer.name}</div>
					<div>{customer.email}</div>
					<div>{customer.image_url}</div>
					<div>{customer.total_invoices}</div>
					<div>{customer.total_pending}</div>
					<div>{customer.total_paid}</div>
				</div>
			))}
		</section>
	);
};
