// RESPONSIBILITY: Renders ManagerReportsKpiCard's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import type { ManagerReportsKpiCardProps } from '@/app/frontend_manager/manager_reports/manager_reports_types/ManagerReportsKpiCardTypes';

/** @description Renders the ManagerReportsKpiCard sub-view extracted from ManagerReportsKPIs; owns only this presentation responsibility. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
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
