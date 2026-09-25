// RESPONSIBILITY: Renders the KPI stat cards (Total Affiliates, Total Commission Paid) for the Affiliates page. Purely presentational — receives data via props.
'use client';

import { formatCurrency } from '@/app/superadmin/affiliates/affiliates_utils/formatCurrency';
import { useLocale } from 'next-intl';
import { Users, IndianRupee } from 'lucide-react';

import type { SuperadminAffiliatesStatsBarProps } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesStatsBarTypes';

export default function SuperadminAffiliatesStatsBar({ totalAffiliates, totalCommission }: SuperadminAffiliatesStatsBarProps) {
    const locale = useLocale();

    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center motion-safe:hover:-translate-y-1 hover:shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-info-bg flex items-center justify-center">
            <Users size={18} className="w-5 text-info"/>
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">Total Affiliates</span>
        </div>
        <div className="text-3xl font-bold text-primary mt-1">{totalAffiliates}</div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center motion-safe:hover:-translate-y-1 hover:shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-success-bg flex items-center justify-center">
            <IndianRupee size={18} className="w-5 text-success"/>
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">Total Commission Paid</span>
        </div>
        <div className="text-3xl font-bold text-primary mt-1">
          {formatCurrency(totalCommission, currency, locale)}
        </div>
      </div>
    </div>);
}
