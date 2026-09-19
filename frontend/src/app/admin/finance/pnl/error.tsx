"use client";
// RESPONSIBILITY: Error boundary for the P&L page (Rule 9 — error.tsx).
// Branded fallback with Retry button. Never exposes raw stack traces.
import { AlertTriangle, RefreshCw } from 'lucide-react';

import type { AdminFinancePnlErrorProps } from '@/app/admin/finance/finance_types/AdminFinancePnlErrorPropsTypes';


export default function AdminFinancePnlError({ error, reset }: AdminFinancePnlErrorProps) {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-6">
      <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center space-y-5 shadow-dialog">
        <div className="w-14 h-14 rounded-2xl bg-danger border border-border flex items-center justify-center mx-auto">
          <AlertTriangle size={24} strokeWidth={2} className="text-danger" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">P&amp;L Data Unavailable</h2>
          <p className="text-sm text-secondary mt-2">
            The Branch P&amp;L Comparison page encountered an error and couldn&apos;t load.
            Your data is safe — this is a display issue.
          </p>
          <p className="text-xs text-secondary mt-3">Please retry. If the issue continues, contact support.</p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
        >
          <RefreshCw size={15} strokeWidth={2} />
          Try Again
        </button>
      </div>
    </div>
  );
}