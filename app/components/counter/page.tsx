import type { Metadata } from 'next';
import { Counter } from '@/app/ui/counter/counter';

export const metadata: Metadata = {
	title: 'Counter Page',
}

export default function Page() {
	return <Counter/>;
}
