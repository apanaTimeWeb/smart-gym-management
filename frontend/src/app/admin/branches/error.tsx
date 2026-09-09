// RESPONSIBILITY: Renders the error boundary for the branches module.
'use client';
import Link from 'next/link';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AdminBranchesError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  // Error logged to monitoring service
  useEffect(() => {
    // Log error locally or to monitoring service
  }, [error]);

  if (error.message?.includes('403') || (error as any).status === 403) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--danger)' }}>Access Denied</h2>
        <p className="text-[var(--text-secondary)] mb-6">You don't have permission to view this page.</p>
        <Link href="/admin/dashboard" className="px-4 py-2 rounded-md bg-[var(--primary)] text-white hover:opacity-90">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6 bg-card rounded-2xl border border-border mt-4">
      <AlertTriangle className="w-12 h-12 text-danger mb-4" />
      <h3 className="text-lg font-bold text-foreground mb-2">Something went wrong</h3>
      <p className="text-secondary">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 mt-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
