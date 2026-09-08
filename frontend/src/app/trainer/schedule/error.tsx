'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center text-danger">
        <AlertTriangle size={32} />
      </div>
      <h2 className="text-2xl font-black text-foreground tracking-tight">Something went wrong!</h2>
      <p className="text-secondary max-w-md">
        We encountered an issue loading your schedule. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        <RefreshCcw size={18} /> Try again
      </button>
    </div>
  );
}
