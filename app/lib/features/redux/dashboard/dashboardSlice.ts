"use client";

import type { PayloadAction } from "@reduxjs/toolkit";

import { CustomersTableType } from "@/app/lib/definitions";
import { createAppSlice } from "@/app/lib/createAppSlice";
// import { fetchCustomers } from "./dashboardAPI";

const initialState: DashboardSliceState = {
	customer: {
		id: "1",
		name: "Alex. InitialState",
		email: "test@test.com",
		image_url: "https://via.placeholder.com/150x150.png?text=Alex",
		total_invoices: 2,
		total_pending: 1,
		total_paid: 1,
	},
	status: "idle",
};

export interface DashboardSliceState {
	customer: CustomersTableType;
	status: "idle" | "loading" | "failed";
}

export const dashboardSlice = createAppSlice({
	name: "dashboard",
	initialState,
	reducers: (create) => ({
		addCustomers: create.reducer(
			(state, action: PayloadAction<CustomersTableType>) => {
				state.customer = action.payload;
			},
		),
	}),
	selectors: {
		selectCustomerName: (dashboard) => dashboard.customer.name,
		selectCustomer: (dashboard) => dashboard.customer,
		selectStatus: (dashboard) => dashboard.status,
	},
});

export const { addCustomers } = dashboardSlice.actions;
export const { selectCustomerName, selectCustomer, selectStatus } = dashboardSlice.selectors;
