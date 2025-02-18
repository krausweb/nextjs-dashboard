'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';

type ErrorType = {
	error: Error & { digest?: string };
	reset: () => void;
	lng: string
}

export default function Error({ error, reset, lng }: ErrorType) {
	const { t } = useTranslation(lng);

	useEffect(() => {
		// Optionally log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h2 className="text-center">{t('something-went-wrong')}</h2>
			<button
				className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
				onClick={
					// Attempt to recover by trying to re-render the invoices route
					() => reset()
				}
			>
				{t('try-again')}
			</button>

			<button
				className="mt-4 rounded-md bg-yellow-500 px-4 py-2 text-sm text-white transition-colors hover:bg-yellow-400"
				onClick={					
					() => history.back()
				}
			>
				{t('go-back')}
			</button>
		</div>
	);
}
