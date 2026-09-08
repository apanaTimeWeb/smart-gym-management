// RESPONSIBILITY: 4 KPI stat cards for the Churn Recovery tab — Total Churned, Churned This Month, Recovery Rate, Avg Days Since Exit.
'use client';

import { UserX, TrendingDown, RotateCcw, Clock } from 'lucide-react';
import type { ChurnKPIData } from '@/app/manager/communications/communications_types/communications_types';

interface ManagerChurnRecoveryKPIsProps {
  kpis: ChurnKPIData | undefined;
}

const CHURN_KPI_CARDS = [
  {
    key: 'totalChurned' as keyof ChurnKPIData,
    label: 'TOTAL CHURNED',
    icon: UserX,
    iconBg: 'bg-danger-bg',
    iconColor: 'text-danger',
    format: (v: number) => v.toString(),
    trend: null,
  },
  {
    key: 'churnedThisMonth' as keyof ChurnKPIData,
    label: 'CHURNED THIS MONTH',
    icon: TrendingDown,
    iconBg: 'bg-warning-bg',
    iconColor: 'text-warning',
    format: (v: number) => v.toString(),
    trend: null,
  },
  {
    key: 'recoveryRate' as keyof ChurnKPIData,
    label: 'RECOVERY RATE',
    icon: RotateCcw,
    iconBg: 'bg-success-bg',
    iconColor: 'text-success',
    format: (v: number) => `${v.toFixed(1)}%`,
    trend: null,
  },
  {
    key: 'avgDaysSinceExit' as keyof ChurnKPIData,
    label: 'AVG DAYS SINCE EXIT',
    icon: Clock,
    iconBg: 'bg-info-bg',
    iconColor: 'text-info',
    format: (v: number) => `${v}d`,
    trend: null,
  },
];

export default function ManagerChurnRecoveryKPIs({ kpis }: ManagerChurnRecoveryKPIsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CHURN_KPI_CARDS.map((card) => {
        const Icon = card.icon;
        const value = kpis ? (kpis[card.key] as number) : null;
        return (
          <div
            key={card.key}
            className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg"
            style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.04), rgba(255,255,255,0.01))' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon size={16} className={card.iconColor} />
              </div>
            </div>
            {value === null ? (
              <div className="h-8 w-24 bg-skeleton-base rounded motion-safe:animate-pulse" />
            ) : (
              <span className="text-3xl font-bold text-foreground">
                {card.format(value)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
