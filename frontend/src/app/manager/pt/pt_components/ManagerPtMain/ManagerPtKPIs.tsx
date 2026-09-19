'use client';
// RESPONSIBILITY: Renders the top-level KPI stat cards for the PT Dashboard.
import type { ManagerPtKPIsProps } from '@/app/manager/pt/pt_types/ManagerPtKpisTypes';
import { Users, CalendarCheck, TrendingUp, AlertCircle } from 'lucide-react';
import { formatKPI } from '@/lib/formatters';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';



export default function ManagerPtKPIs({ kpis }: ManagerPtKPIsProps) {
  const dateSuffix = useDateRangeSuffix();
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1 */}
      <div className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-transform">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users size={18} className="text-primary" />
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">
            {`Active PT Members${dateSuffix}`}
          </span>
        </div>
        <div className="text-2xl font-bold text-primary">
          {kpis.totalActiveAssignments}
        </div>
      </div>

      {/* KPI 2 */}
      <div className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-transform">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <CalendarCheck size={18} className="text-success" />
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">
            {`Sessions Today${dateSuffix}`}
          </span>
        </div>
        <div className="text-2xl font-bold text-primary">
          {kpis.sessionsScheduledToday}
        </div>
      </div>

      {/* KPI 3 */}
      <div className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-transform">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-warning/10 rounded-lg">
            <AlertCircle size={18} className="text-warning" />
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">
            {`Expiring Packages${dateSuffix}`}
          </span>
        </div>
        <div className="text-2xl font-bold text-primary">
          {kpis.packagesExpiringSoon}
        </div>
      </div>

      {/* KPI 4 */}
      <div className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-transform">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-info/10 rounded-lg">
            <TrendingUp size={18} className="text-info" />
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">
            {`Monthly PT Revenue${dateSuffix}`}
          </span>
        </div>
        <div className="text-2xl font-bold text-primary">
          {formatKPI(kpis.monthlyPtRevenue)}
        </div>
      </div>
    </div>
  );
}
