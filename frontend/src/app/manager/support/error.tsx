'use client';
// RESPONSIBILITY: Error boundary for /manager/support.
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ManagerSupportError({ reset }: { reset: () => void }) {
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-64 gap-4">
      <div className="p-3 bg-danger-bg rounded-full">
        <AlertTriangle size={28} className="text-danger" />
      </div>
      <h2 className="text-lg font-bold text-foreground">Failed to load support</h2>
      <p className="text-sm text-secondary text-center">Something went wrong. Please try again.</p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-semibold rounded-lg text-sm motion-safe:transition-colors hover:bg-primary-hover"
      >
        <RefreshCcw size={15} /> Try Again
      </button>
    </div>
  );
}
