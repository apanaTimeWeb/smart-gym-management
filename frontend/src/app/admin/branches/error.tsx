// RESPONSIBILITY: Renders the error boundary for the branches module.
'use client';

import { useEffect } from 'react';

export default function BranchesError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error("Branches module error:", error);
  }, [error]);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-page">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-2xl font-bold text-error">Something went wrong!</h2>
        <p className="text-secondary">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
