"use client";

import {
	selectCustomerName,
	selectCustomer,
	selectStatus,
} from "@/app/lib/features/redux/dashboard/dashboardSlice";

import { useAppSelector } from "@/app/lib/hooks";

export default function Customers() {
	const customer = useAppSelector(selectCustomer);
	const customerName = useAppSelector(selectCustomerName);
	const status = useAppSelector(selectStatus);

	return (
		<section className="mb-10">
			<h2 className="text-2xl font-bold my-4">Customer, Init data</h2>

			<h3 className="text-xxl font-bold my-4">status Selector</h3>
			<div>{status}</div>

			<h3 className="text-xxl font-bold my-4">customerName Selector</h3>
			<div>{customerName}</div>

			<h3 className="text-xxl font-bold my-4">customer Selector</h3>
			<div>{customer.name}</div>
			<div>{customer.email}</div>
			<div>{customer.image_url}</div>
			<div>{customer.total_invoices}</div>
			<div>{customer.total_pending}</div>
			<div>{customer.total_paid}</div>
		</section>
	);
};
