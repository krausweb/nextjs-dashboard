import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		alias: {
			'@/': new URL('./', import.meta.url).pathname,
		},
		globals: true,
		setupFiles: './app/lib/vitest-setup.ts',
		include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		exclude: ['node_modules', '.next', '.vscode'],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	}
})
