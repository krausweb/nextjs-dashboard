'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// MARK: Invoice Actions and deps

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string({
		invalid_type_error: 'Please select a customer',
	}),
	amount: z.coerce // convert string
		.number()	// 					to number
		.gt(0, { message: 'Please enter an amount greater than $0' }),
	status: z.enum(['pending', 'paid'], {
		invalid_type_error: 'Please select an invoice status',
	}),
	date: z.string(),
});

export type State = {
	errors?: {
		customerId?: string | string[];
		amount?: string | string[];
		status?: string | string[];
	};
	message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevStep: State, formData: FormData) {
	// Validate form fields using Zod
	const validatedFields = CreateInvoice.safeParse({
		customerId: formData.get('customerId'),
		amount: formData.get('amount'),
		status: formData.get('status'),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice',
		};
	}

	const { customerId, amount, status } = validatedFields.data;
	const amountInCents = amount * 100;
	const date = new Date().toISOString().split('T')[0];

	try {
		await sql`
			INSERT INTO invoices (customer_id, amount, status, date)
			VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
		`;
	} catch (error) {
		// If a database error occurs, return a more specific error.
		return {
			message: `Database Error: Failed to Create Invoice`,
		};
	}

	// Calling revalidatePath to clear the client cache and make a new server request.
	revalidatePath('/dashboard/invoices');
	redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevStep: State, formData: FormData) {
	const validatedFields = UpdateInvoice.safeParse({
		customerId: formData.get('customerId'),
		amount: formData.get('amount'),
		status: formData.get('status'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Update Invoice',
		};
	}

	const { customerId, amount, status } = validatedFields.data;
	const amountInCents = amount * 100;

	try {
		await sql`
			UPDATE invoices
			SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
			WHERE id = ${id}
		`;
	} catch (error) {
		return {
			message: `Database Error: Failed to Update Invoice`,
		};
	}

	revalidatePath('/dashboard/invoices');
	redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
	try {
		await sql`
			DELETE FROM invoices
			WHERE id = ${id}
		`;
		revalidatePath('/dashboard/invoices');
		return {
			message: 'Deleted Invoice',
		};
	} catch (error) {
		return {
			message: `Database Error: Failed to Delete Invoice`,
		};
	}
}

// MARK: Customers Actions and deps

const FormSchemaCustomer = z.object({
	id: z.string(),
	name: z.string()
		.min(3, { message: 'Please enter at least 3 symbols' }),
	email: z.string()
		.min(8, { message: 'Please enter at least 8 symbols' })
		.email({ message: 'Please enter a valid email' }),
	image_url: z.string()
		.startsWith('https://', { message: 'Please enter a valid URL' })
		.or(
			z.string().startsWith('http://', { message: 'OR please enter a secure valid URL' })
		)
		.or(
			z.string().startsWith('/', { message: 'OR please start URL with /' })
		),
});

export type StateCustomer = {
	errors?: {
		name?: string | string[];
		email?: string | string[];
		image_url?: string | string[];
	};
	message?: string | null;
};

const CreateCustomer = FormSchemaCustomer.omit({ id: true });
const UpdateCustomer = FormSchemaCustomer.omit({ id: true });

export async function createCustomer(prevStep: StateCustomer, formData: FormData) {
	const validatedFields = CreateCustomer.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		image_url: formData.get('image_url'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Customer',
		};
	}

	const { name, email, image_url } = validatedFields.data;

	try {
		await sql`
			INSERT INTO customers (name, email, image_url)
			VALUES (${name}, ${email}, ${image_url})
		`;
	} catch (error) {
		return {
			message: `Database Error: Failed to Create Customer`,
		};
	}

	revalidatePath('/dashboard/customers');
	redirect('/dashboard/customers');
}

export async function updateCustomer(id: string, prevStep: StateCustomer, formData: FormData) {
	const validatedFields = UpdateCustomer.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		image_url: formData.get('image_url'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Update Customer',
		};
	}

	const { name, email, image_url } = validatedFields.data;

	try {
		await sql`
			UPDATE customers
			SET name = ${name}, email = ${email}, image_url = ${image_url}
			WHERE id = ${id}
		`;
	} catch (error) {
		return {
			message: `Database Error: Failed to Update Customer`,
		};
	}

	revalidatePath('/dashboard/customers');
	redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
	try {
		await sql`
			DELETE FROM customers
			WHERE id = ${id}
		`;
		revalidatePath('/dashboard/customers');
		return {
			message: 'Deleted Customer',
		};
	} catch (error) {
		return {
			message: `Database Error: Failed to Delete Customer`,
		};
	}
}

// MARK: Authentication

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
		throw error;
	}
}
