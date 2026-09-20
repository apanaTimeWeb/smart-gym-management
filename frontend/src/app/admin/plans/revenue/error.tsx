"use client";
// RESPONSIBILITY: Handles and displays errors encountered while loading the Plan Revenue Dashboard.

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
      <div className="bg-danger-bg p-4 rounded-full mb-4">
        <AlertTriangle size={48} className="text-danger" />
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">Something went wrong!</h2>
      <p className="text-secondary text-center max-w-md mb-6">
        Please retry. If the issue continues, contact support.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
      >
        <RefreshCw size={18} />
        Try Again
      </button>
    </div>
  );
}