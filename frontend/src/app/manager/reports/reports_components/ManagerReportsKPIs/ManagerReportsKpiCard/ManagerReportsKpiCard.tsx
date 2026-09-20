// RESPONSIBILITY: Renders the ManagerReportsKpiCard sub-view extracted from ManagerReportsKPIs; owns only this presentation responsibility.
'use client';
import type { ManagerReportsKpiCardProps } from '@/app/manager/reports/reports_types/ManagerReportsKpiCardTypes';

export function ManagerReportsKpiCard({ label, value, icon: Icon, iconBg, iconColor, sub, subColor }: ManagerReportsKpiCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:shadow-card">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-medium text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-primary mt-0.5">{value}</p>
        {sub && <p className={`text-xs mt-0.5 ${subColor ?? 'text-secondary'}`}>{sub}</p>}
      </div>
    </div>
  );
}
