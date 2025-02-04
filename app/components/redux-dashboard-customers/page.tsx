import { Suspense } from "react";

import Customer from "./customer";
import CustomerListFromDB from "./customerList";

export default function Page() {
	return (
		<div>
			<h1>Customers from Redux Store</h1>

			<Customer />

			<Suspense fallback={<div>Loading customers...</div>}>
				<CustomerListFromDB />
			</Suspense>
		</div>
	)
}
