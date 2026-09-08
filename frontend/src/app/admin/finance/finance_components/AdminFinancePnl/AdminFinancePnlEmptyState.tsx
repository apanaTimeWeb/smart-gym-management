// RESPONSIBILITY: Empty state shown when the status filter returns zero branches.
'use client';

import { BarChart3 } from 'lucide-react';
import type { PnlStatusFilter } from '@/app/admin/finance/finance_types/finance_types';

interface AdminFinancePnlEmptyStateProps {
  statusFilter: PnlStatusFilter;
  onReset: () => void;
}

const EMPTY_MESSAGES: Record<PnlStatusFilter, string> = {
  ALL:        'No branch P&L data found for this period.',
  PROFITABLE: 'No profitable branches found for this period.',
  BREAKEVEN:  'No break-even branches found for this period.',
  LOSS:       'No loss-making branches found for this period.',
};

export default function AdminFinancePnlEmptyState({ statusFilter, onReset }: AdminFinancePnlEmptyStateProps) {
  return (
    <tr>
      <td colSpan={8} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-input flex items-center justify-center border border-border">
            <BarChart3 size={24} strokeWidth={2} className="text-secondary" />
          </div>
          <p className="text-sm font-semibold text-foreground">{EMPTY_MESSAGES[statusFilter]}</p>
          <p className="text-xs text-secondary">Try changing the period or clearing the filter.</p>
          {statusFilter !== 'ALL' && (
            <button
              onClick={onReset}
              className="mt-1 px-4 py-2 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Clear Filter
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
