// RESPONSIBILITY: Renders the aging report for unpaid invoices.
'use client';

import { formatCurrency } from '@/app/superadmin/saas-billing/saas-billing_utils/formatCurrency';
import { useLocale } from 'next-intl';
import React, { useMemo } from 'react';
import type { SaaSInvoice } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTypes';
import { displayValue } from '@/lib/formatters';
import { calculateSuperadminInvoicesAging } from '@/app/superadmin/saas-billing/invoices/invoices_utils/SuperadminInvoicesAgingUtils';
export default function SuperadminInvoicesAgingReport({ invoices }: {
    invoices: SaaSInvoice[];
}) {
    const locale = useLocale();

    const { agingBuckets, totalUnpaid } = useMemo(() => calculateSuperadminInvoicesAging(invoices), [invoices]);
    return (<div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Accounts Receivable Aging</h2>
        <div className="text-right">
          <p className="text-sm text-secondary">Total Outstanding</p>
          <p className="text-2xl font-bold text-danger">{formatCurrency(totalUnpaid, 'INR', locale)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(agingBuckets).map(([bucket, data]) => (<div key={bucket} className="bg-input border border-border rounded-xl p-4 shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider">{bucket}</h3>
              <p className="text-2xl font-bold text-primary mt-2">{formatCurrency(data.amount, 'INR', locale)}</p>
              <p className="text-xs text-secondary mt-1">{data.count} invoices</p>
            </div>
            {data.invoices.length > 0 && (<div className="mt-4 pt-4 border-t border-border max-h-32 overflow-y-auto scrollbar-thin">
                {data.invoices.map(inv => (<div key={inv.id} className="flex justify-between text-xs py-1">
                    <span className="text-primary truncate max-w-24" title={displayValue(inv.tenantName)}>{displayValue(inv.tenantName)}</span>
                    <span className="font-medium text-secondary">{formatCurrency(inv.amount, inv.currency || 'INR', locale)}</span>
                  </div>))}
              </div>)}
          </div>))}
      </div>
    </div>);
}
