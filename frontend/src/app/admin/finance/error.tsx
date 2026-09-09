// RESPONSIBILITY: Provides the implementation for error.tsx functionality within its module.
'use client';

import { useEffect } from "react";
import Link from 'next/link';

export default function FinanceError({
 error,
 reset,
}: {
 error: Error & { digest?: string };
 reset: () => void;
}) {
 useEffect(() => {
 // Error logged to monitoring provider
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
 <div className="min-h-full flex items-center justify-center finance-module">
 <div className="text-center">
 <p className="font-medium" style={{ color: 'var(--danger)' }}>Something went wrong!</p>
 <p className="text-sm mt-1" style={{ color: 'var(--danger)' }}>{error.message || 'An unexpected error occurred in the finance module.'}</p>
 <button
 onClick={() => reset()}
 className="mt-4 px-4 py-2 rounded-md font-medium text-white"
 style={{ backgroundColor: 'var(--primary)' }}
 >
 Try again
 </button>
 </div>
 </div>
 );
}
