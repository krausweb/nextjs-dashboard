import type { Metadata } from 'next';
import { Counter } from '@/app/ui/counter/counter';
import { Quotes } from '@/app/ui/quotes/quotes';

export const metadata: Metadata = {
	title: 'Redux Components Page',
}

export default function Page() {
	return (
		<>
			<h1 className="text-3xl font-bold dark:text-white">Several Components with examples</h1>
			<Counter />
			<Quotes />
		</>
	);
}
