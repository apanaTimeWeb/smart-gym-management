// RESPONSIBILITY: 4 KPI stat cards for the Churn Recovery tab — Total Churned, Churned This Month, Recovery Rate, Avg Days Since Exit.
'use client';
import { MANAGER_CHURN_RECOVERY_KPI_CARDS } from '@/app/manager/communications/communications_constants/ManagerChurnRecoveryKpiConstants';
import type { ManagerChurnRecoveryKPIsProps } from '@/app/manager/communications/communications_types/ManagerChurnRecoveryKpisTypes';






export default function ManagerChurnRecoveryKPIs({ kpis }: ManagerChurnRecoveryKPIsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {MANAGER_CHURN_RECOVERY_KPI_CARDS.map((card) => {
        const Icon = card.icon;
        const value = kpis ? (kpis[card.key] as number) : null;
        return (
          <div
            key={card.key}
            className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-secondary uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon size={18} className={card.iconColor} />
              </div>
            </div>
            {value === null ? (
              <div className="h-8 w-24 bg-skeleton-base rounded motion-safe:animate-pulse" />
            ) : (
              <span className="text-kpi font-bold text-primary">
                {card.format(value)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
