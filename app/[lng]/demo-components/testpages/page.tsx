import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Counter Page',
}

import styles from '@/app/ui/styles/home.module.css';

export default function Page() {
	return (
		<>
			<h1 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-6">
				Test page with examples that should not be shown in the dashboard.
			</h1>
			<details className="p-3 mb-4 border rounded">
				<summary>Style Module solution</summary>
				<div className={`${styles.shape} mt-3`} />
			</details>

			<div className="mb-3">
				Tailwind solution
				<div className="mt-3 relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
			</div>
		</>
	);
}
