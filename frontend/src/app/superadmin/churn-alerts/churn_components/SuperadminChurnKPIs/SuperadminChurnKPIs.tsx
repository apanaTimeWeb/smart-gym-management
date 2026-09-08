'use client';
// RESPONSIBILITY: Renders the 4 KPI stat cards at the top of the Churn Alerts page.
// Display-only — no data fetching, no mutations.

import { AlertTriangle, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { KPI_CARD_GRADIENT } from '@/app/superadmin/churn-alerts/churn_utils/churn_constants';
import type { ChurnKpiData } from '@/app/superadmin/churn-alerts/churn_types/churn_types';

interface SuperadminChurnKPIsProps {
  kpis: ChurnKpiData;
}

export default function SuperadminChurnKPIs({ kpis }: SuperadminChurnKPIsProps) {
  const cards = [
    {
      label: 'Total At Risk',
      value: kpis.totalAtRisk,
      icon: Activity,
      color: 'text-warning',
      iconBg: 'bg-warning-bg',
    },
    {
      label: 'Critical Risk',
      value: kpis.criticalCount,
      icon: AlertTriangle,
      color: 'text-danger',
      iconBg: 'bg-danger-bg',
    },
    {
      label: 'High Risk',
      value: kpis.highCount,
      icon: TrendingDown,
      color: 'text-warning',
      iconBg: 'bg-warning-bg',
    },
    {
      label: 'MRR At Risk',
      value: `₹${(kpis.estimatedMrrAtRisk / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'text-danger',
      iconBg: 'bg-danger-bg',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-card border border-border rounded-xl p-4 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200"
            style={{ background: KPI_CARD_GRADIENT }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                <Icon size={18} strokeWidth={2} className={card.color} />
              </div>
            </div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
