// RESPONSIBILITY: Renders the error boundary for the branches module.
'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { StatusCodes } from 'http-status-codes';
import { logErrorToMonitoring } from '@/app/admin/admin_utils/monitoring';

export default function AdminBranchesError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    logErrorToMonitoring(error, { module: 'branches' });
  }, [error]);

  if (error.message?.includes(String(StatusCodes.FORBIDDEN)) || (error as any).status === StatusCodes.FORBIDDEN) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-danger">Access Denied</h2>
        <p className="text-secondary mb-6">You don't have permission to view this page.</p>
        <Link href="/admin/dashboard" className="px-4 py-2 rounded-md bg-primary text-black hover:bg-primary-hover motion-safe:transition-colors">
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
        className="px-4 py-2 mt-4 bg-primary text-black rounded-lg hover:bg-primary-hover motion-safe:transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
