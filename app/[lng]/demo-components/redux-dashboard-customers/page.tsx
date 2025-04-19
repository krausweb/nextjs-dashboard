import { Suspense } from "react";

import Customer from "./customer";
import CustomerListFromDB from "./customerList";

export default function Page() {
	return (
		<div>
			<h1 className="dark:text-white">Customers from Redux Store</h1>

			<Customer />

			<Suspense fallback={<div className="dark:text-white">Loading customers...</div>}>
				<CustomerListFromDB />
			</Suspense>
		</div>
	)
}
