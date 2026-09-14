'use client';
import { TrendingDown, HeartPulse, IndianRupee } from 'lucide-react';
import { KPI_CARD_GRADIENT } from '@/app/superadmin/reports/reports_types/reports_constants';
import { formatCurrency } from '@/lib/formatters';

export function SuperadminReportsSummaryCards({
  totalMRR,
  totalChurnedRevenue,
  churnCount,
  avgHealthScore,
  healthDataLength,
  dateSuffix,
}: {
  totalMRR: number;
  totalChurnedRevenue: number;
  churnCount: number;
  avgHealthScore: number;
  healthDataLength: number;
  dateSuffix?: string;
}) {
  const suffix = dateSuffix ? ` ${dateSuffix.toUpperCase()}` : '';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
        style={{ background: KPI_CARD_GRADIENT }}
      >
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee size={18} strokeWidth={2} className="text-primary" />
          <span className="text-xs text-secondary uppercase tracking-wider">Current Monthly Income{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{formatCurrency(totalMRR)}</p>
        <p className="text-xs text-success mt-1">↑ +8.6% from last month</p>
      </div>
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
        style={{ background: KPI_CARD_GRADIENT }}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown size={18} strokeWidth={2} className="text-danger" />
          <span className="text-xs text-secondary uppercase tracking-wider">Lost Income{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{formatCurrency(totalChurnedRevenue)}</p>
        <p className="text-xs text-danger mt-1">{churnCount} gyms left</p>
      </div>
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
        style={{ background: KPI_CARD_GRADIENT }}
      >
        <div className="flex items-center gap-2 mb-2">
          <HeartPulse size={18} strokeWidth={2} className="text-success" />
          <span className="text-xs text-secondary uppercase tracking-wider">Avg Health Score{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{avgHealthScore}/100</p>
        <p className="text-xs text-secondary mt-1">Across {healthDataLength} active gyms</p>
      </div>
    </div>
  );
}
