'use client';

import { useGetQuotesQuery } from '@/app/lib/features/redux/official/quotes/quotesApiSlice';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const optionListValues = [1, 5, 10, 20, 30];

export function Quotes() {
	const [quotesNumber, setQuotesNumber] = useState(5);
	const { data, isError, isLoading, isSuccess } = useGetQuotesQuery(quotesNumber);

	const handleQuotesNumberChange = useDebouncedCallback((value) => {
		if (value === '' && value === null) return;
		setQuotesNumber(Number(value));
	}, 1000);

	if (isError) {
		return <h2>Error Occurred</h2>;
	}

	if (isLoading) {
		return <h2>Loading: {isLoading ? 'Yes' : 'No'}</h2>
	}

	if (isSuccess) {
		return (
			<div className="mb-10">
				<h2 className="text-2xl font-bold my-4">Quotes</h2>
				<div>Number of quotes: <strong>{data.quotes.length}</strong></div>

				<div className="my-4">Select number of quotes:
					<select name="select" value={quotesNumber} className="ml-2"
						onChange={(e) => setQuotesNumber(Number(e.target.value))}>
						{optionListValues.map((optionValue) => (
							<option key={optionValue} value={optionValue}>{optionValue}</option>
						))}
						{!optionListValues.includes(quotesNumber) ? <option value={quotesNumber}>{quotesNumber}</option> : null}
					</select>
				</div>

				<div className="my-4">
					<label htmlFor="quotesNumber">Set exact number of quotes:</label>
					<input id="quotesNumber" type="number" value={quotesNumber} className="w-20"
						onChange={(e) => handleQuotesNumberChange(e.target.value)} />
				</div>

				<section>
					{data.quotes.map((quote) => (
						<div key={quote.id} className="my-4">
							<p><cite>Author: {quote.author}</cite></p>
							<blockquote>Quote: {quote.quote}</blockquote>
						</div>
					))}
				</section>
			</div>
		);
	}
}
