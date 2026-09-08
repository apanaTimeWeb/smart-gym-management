'use client';

// RESPONSIBILITY: Error boundary for the P&L page (Rule 9 — error.tsx).
// Branded fallback with Retry button. Never exposes raw stack traces.
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface AdminFinancePnlErrorProps {
  error: Error;
  reset: () => void;
}

export default function AdminFinancePnlError({ error, reset }: AdminFinancePnlErrorProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center space-y-5 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto">
          <AlertTriangle size={24} strokeWidth={2} className="text-danger" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">P&amp;L Data Unavailable</h2>
          <p className="text-sm text-secondary mt-2">
            The Branch P&amp;L Comparison page encountered an error and couldn&apos;t load.
            Your data is safe — this is a display issue.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-danger mt-3 font-mono bg-danger/5 border border-danger/20 rounded-lg p-2 text-left break-words">
              {error.message}
            </p>
          )}
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-black text-sm font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <RefreshCw size={15} strokeWidth={2} />
          Try Again
        </button>
      </div>
    </div>
  );
}
