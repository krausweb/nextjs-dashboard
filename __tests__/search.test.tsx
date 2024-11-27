import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Search from '@/app/ui/search'

describe('Search component', () => {
	render(<Search placeholder='Search' />)
	const searchField = screen.getByLabelText('Search');

	test('input field has correct placeholder', () => {
		expect(searchField).toHaveAttribute('placeholder', 'Search');
		// screen.debug(searchField);
	})

	test('input field has correct id', () => {
		expect(searchField).toHaveAttribute('id', 'search');
	})

	test('screen reader only label is correct', () => {
		expect(searchField).toBeDefined();
	})
});
