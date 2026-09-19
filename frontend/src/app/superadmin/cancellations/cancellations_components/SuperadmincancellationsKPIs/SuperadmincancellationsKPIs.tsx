// RESPONSIBILITY: Renders the 4 KPI stat cards at the top of the Cancellations Alerts page.
'use client';
// Display-only — no data fetching, no mutations.
import { AlertTriangle, TrendingDown, DollarSign, Activity } from 'lucide-react';
import type { CancellationsKpiData } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';
import { formatKPI } from '@/lib/formatters';
import type { SuperadminCancellationsKPIsProps } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsKPIsTypes';

export default function SuperadminCancellationsKPIs({ kpis, activeFilter, onFilterClick }: SuperadminCancellationsKPIsProps) {
    const cards = [
        {
            label: 'Total At Risk',
            value: kpis.totalAtRisk,
            icon: Activity,
            color: 'text-warning',
            iconBg: 'bg-warning-bg',
            filter: 'ALL',
        },
        {
            label: 'Critical Risk',
            value: kpis.criticalCount,
            icon: AlertTriangle,
            color: 'text-danger',
            iconBg: 'bg-danger-bg',
            filter: 'CRITICAL',
        },
        {
            label: 'High Risk',
            value: kpis.highCount,
            icon: TrendingDown,
            color: 'text-warning',
            iconBg: 'bg-warning-bg',
            filter: 'HIGH',
        },
        {
            label: 'Monthly Income At Risk',
            value: formatKPI(kpis.estimatedMrrAtRisk),
            icon: DollarSign,
            color: 'text-danger',
            iconBg: 'bg-danger-bg',
            filter: null,
        },
    ];
    return (<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map((card) => {
            const Icon = card.icon;
            const isActive = activeFilter === card.filter;
            const isClickable = !!card.filter && !!onFilterClick;
            return (<div key={card.label} onClick={() => isClickable && onFilterClick!(card.filter!)} className={`bg-card border rounded-xl p-4 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base ${isClickable ? 'cursor-pointer' : 'cursor-default'} ${isActive ? 'border-primary ring-1 ring-primary/40' : 'border-border'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={2}/>
              </div>
            </div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>);
        })}
    </div>);
}
