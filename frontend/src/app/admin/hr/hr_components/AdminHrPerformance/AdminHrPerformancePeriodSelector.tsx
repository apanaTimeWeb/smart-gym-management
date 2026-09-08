// RESPONSIBILITY: Renders the period selection buttons and export action for the dashboard.
'use client';

import { Download } from 'lucide-react';
import { PERFORMANCE_PERIOD_OPTIONS } from '@/app/admin/hr/hr_utils/AdminHrPerformanceConstants';
import type { PerformancePeriod } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

interface AdminHrPerformancePeriodSelectorProps {
  period: PerformancePeriod;
  onPeriodChange: (p: PerformancePeriod) => void;
}

export default function AdminHrPerformancePeriodSelector({ period, onPeriodChange }: AdminHrPerformancePeriodSelectorProps) {
  function handleExport() {
    alert('Export CSV coming soon');
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex flex-wrap gap-1 bg-input border border-border rounded-xl p-1">
        {PERFORMANCE_PERIOD_OPTIONS.map((opt) => (
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
