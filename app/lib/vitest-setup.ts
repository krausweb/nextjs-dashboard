/*
*   A setup file that runs before your tests (see vitest.config.js)
*   You can use this file to set up any global mocks or configurations.
*/
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest'

vi.mock('next/navigation', async () => {
	const actual = await vi.importActual('next/navigation');
	return {
		...actual,
		useRouter: vi.fn(() => ({
			push: vi.fn(),
			replace: vi.fn(),
		})),
		useSearchParams: vi.fn(() => ({
			get: vi.fn(),
		})),
		usePathname: vi.fn(),
	};
});
