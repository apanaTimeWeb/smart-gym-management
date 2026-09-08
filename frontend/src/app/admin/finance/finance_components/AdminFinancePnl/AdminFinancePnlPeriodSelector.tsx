// RESPONSIBILITY: Period selector segmented control + Export CSV button for the P&L page.
'use client';

import { Download } from 'lucide-react';
import { PNL_PERIOD_OPTIONS } from '@/app/admin/finance/finance_utils/AdminFinancePnlConstants';
import type { PnlPeriod } from '@/app/admin/finance/finance_types/finance_types';

interface AdminFinancePnlPeriodSelectorProps {
  period: PnlPeriod;
  onPeriodChange: (p: PnlPeriod) => void;
}

export default function AdminFinancePnlPeriodSelector({
  period,
  onPeriodChange,
}: AdminFinancePnlPeriodSelectorProps) {
  function handleExport() {
    // Simulated export — replace with real CSV generation when API is live
    alert('Export CSV coming soon — will call GET /admin/finance/pnl/export');
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      {/* Segmented Control */}
      <div className="flex flex-wrap gap-1 bg-input border border-border rounded-xl p-1">
        {PNL_PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onPeriodChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              period === opt.value
                ? 'bg-primary text-white shadow-sm'
                : 'text-secondary hover:text-foreground hover:bg-card'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Export */}
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-secondary hover:text-foreground hover:border-primary motion-safe:transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Download size={15} strokeWidth={2} />
        Export CSV
      </button>
    </div>
  );
}
