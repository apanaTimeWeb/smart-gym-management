// RESPONSIBILITY: Renders the Reports Summary Cards component and its associated UI logic.
'use client';

import { formatCurrency } from '@/app/superadmin/reports/reports_utils/formatCurrency';
import { useLocale } from 'next-intl';
import { TrendingDown, HeartPulse, IndianRupee } from 'lucide-react';

import type { SuperadminReportsSummaryCardsProps } from '@/app/superadmin/reports/reports_types/SuperadminReportsTabTypes';
export function SuperadminReportsSummaryCards({ totalMRR, totalCancelledRevenue, cancellationsCount, avgHealthScore, healthDataLength, dateSuffix, incomeChangePercent }: SuperadminReportsSummaryCardsProps) {
    const locale = useLocale();

    const suffix = dateSuffix ? ` ${dateSuffix.toUpperCase()}` : '';
    return (<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee size={18} className="w-5 text-primary" strokeWidth={2}/>
          <span className="text-xs text-secondary uppercase tracking-wider">Current Monthly Income{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-primary">{formatCurrency(totalMRR, metrics?.currency || 'INR', locale)}</p>
        <p className="mt-1 text-xs text-success">{incomeChangePercent === null ? 'No prior-period comparison' : `↑ ${incomeChangePercent > 0 ? '+' : ''}${incomeChangePercent}% vs prior month`}</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown size={18} className="w-5 text-danger" strokeWidth={2}/>
          <span className="text-xs text-secondary uppercase tracking-wider">Lost Income{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-primary">{formatCurrency(totalCancelledRevenue, metrics?.currency || 'INR', locale)}</p>
        <p className="mt-1 text-xs text-danger">{cancellationsCount} tenants cancelled</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base">
        <div className="flex items-center gap-2 mb-2">
          <HeartPulse size={18} className="w-5 text-success" strokeWidth={2}/>
          <span className="text-xs text-secondary uppercase tracking-wider">Avg Health Score{suffix}</span>
        </div>
        <p className="text-3xl font-bold text-primary">{avgHealthScore}/100</p>
        <p className="mt-1 text-xs text-secondary">Across {healthDataLength} active tenants</p>
      </div>
    </div>);
}
