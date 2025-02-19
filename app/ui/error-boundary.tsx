'use client';

import { ErrorBoundary } from 'react-error-boundary';

export const fallbackRender = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
    return (
        <aside role="alert" className="italic h-fit w-fit p-2">
            <div className='text-red-500'>Something went wrong:</div>
            <div className='text-red-700'>{error.message}</div>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={resetErrorBoundary}
            >
                Try again
            </button>
        </aside>
    );
}

export default function ErrorBoundaryWithUI({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ErrorBoundary fallbackRender={fallbackRender}>
                {children}
            </ErrorBoundary>
        </>
    );
}