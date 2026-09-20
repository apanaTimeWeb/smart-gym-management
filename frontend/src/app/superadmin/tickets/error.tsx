// RESPONSIBILITY: error.tsx handles module-level rendering errors.
'use client';
import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { logger } from '@/lib/logger';
export default function ErrorBoundary({ error, reset }: {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}) {
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(() => {
        logger.error('Module Error:', error);
    }, [error]);
    return (<div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl shadow-card">
      <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4">
        <AlertTriangle size={18} className="w-8 text-danger"/>
      </div>
      <h2 className="text-xl font-bold text-primary mb-2">Failed to load view</h2>
      <p className="text-secondary text-sm max-w-md text-center mb-6">
        An unexpected error occurred while rendering this module. Please try again or contact support if the issue persists.
      </p>
      <button onClick={reset} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-on-primary px-6 py-2.5 rounded-lg font-medium motion-safe:transition-colors shadow-card">
        <RefreshCcw size={18} className="w-4"/>
        Try Again
      </button>
    </div>);
}
