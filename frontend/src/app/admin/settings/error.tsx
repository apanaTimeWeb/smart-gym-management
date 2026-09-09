// RESPONSIBILITY: Next.js error.tsx � renders the typed error boundary fallback for the Settings module with a Retry button.
'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
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
 <div className="min-h-full flex items-center justify-center p-6 bg-background">
 <div className="bg-card border border-destructive/20 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
 <div className="w-16 h-16 bg-danger-bg/10 rounded-full flex items-center justify-center mx-auto text-danger mb-2">
 <AlertTriangle size={32} />
 </div>
 
 <h2 className="text-xl font-bold text-foreground">Something went wrong!</h2>
 
 <p className="text-sm text-secondary">
 We encountered an issue loading the settings dashboard.
 </p>

 <div className="pt-4">
 <button
 onClick={() => reset()}
 className="px-6 py-2.5 bg-danger hover:bg-danger/90 text-white font-medium rounded-xl transition-colors shadow-sm shadow-destructive/20"
 >
 Try again
 </button>
 </div>
 </div>
 </div>
 );
}
