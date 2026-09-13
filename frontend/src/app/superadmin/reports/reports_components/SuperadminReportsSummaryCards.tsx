import { TrendingDown, HeartPulse, IndianRupee } from 'lucide-react';
import { KPI_CARD_GRADIENT } from '@/app/superadmin/reports/reports_types/reports_constants';

export function SuperadminReportsSummaryCards({
  totalMRR,
  totalChurnedRevenue,
  churnCount,
  avgHealthScore,
  healthDataLength,
}: {
  totalMRR: number;
  totalChurnedRevenue: number;
  churnCount: number;
  avgHealthScore: number;
  healthDataLength: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
        style={{ background: KPI_CARD_GRADIENT }}
      >
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee size={18} strokeWidth={2} className="text-primary" />
          <span className="text-xs text-secondary uppercase tracking-wider">Current MRR</span>
        </div>
        <p className="text-3xl font-bold text-foreground">₹{totalMRR.toLocaleString('en-IN')}</p>
        <p className="text-xs text-success mt-1">↑ +8.6% from last month</p>
      </div>
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
        style={{ background: KPI_CARD_GRADIENT }}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown size={18} strokeWidth={2} className="text-danger" />
          <span className="text-xs text-secondary uppercase tracking-wider">Churned Revenue (MTD)</span>
        </div>
        <p className="text-3xl font-bold text-foreground">₹{totalChurnedRevenue.toLocaleString('en-IN')}</p>
        <p className="text-xs text-danger mt-1">{churnCount} tenants churned</p>
      </div>
      <div
        className="bg-card border border-border rounded-xl p-5 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
        style={{ background: KPI_CARD_GRADIENT }}
      >
        <div className="flex items-center gap-2 mb-2">
          <HeartPulse size={18} strokeWidth={2} className="text-success" />
          <span className="text-xs text-secondary uppercase tracking-wider">Avg Health Score</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{avgHealthScore}/100</p>
        <p className="text-xs text-secondary mt-1">Across {healthDataLength} active tenants</p>
      </div>
    </div>
  );
}
