// RESPONSIBILITY: Renders/orchestrates SuperadminInvoicesAgingReport within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { formatCurrency as SuperadminInvoicesFormatCurrency } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesFormatCurrency';
// RESPONSIBILITY: Renders and composes SuperadminInvoicesAgingReport for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import React, { useMemo } from 'react';

import { useTranslations, useLocale } from 'next-intl';

import { displayValue } from '@/lib/formatters';

import { calculateSuperadminInvoicesAging } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesAgingUtils';

import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTypes';


/** @description Renders the invoice aging breakdown from feature-owned invoice records. @dependencies Consumes invoice data already fetched by the parent query layer. @edge-case Produces an empty/zero-state without dividing by zero when no invoices are present. */
export default function SuperadminInvoicesAgingReport({ invoices }: {
    invoices: SaaSInvoice[];
}) {
  const t = useTranslations('superadmin_invoices');
    const locale = useLocale();

    const { agingBuckets, totalUnpaid } = useMemo(() => calculateSuperadminInvoicesAging(invoices), [invoices]);
    return (<div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">{t('ui.accounts_receivable_aging_8ae68da4')}</h2>
        <div className="text-right">
          <p className="text-sm text-secondary">{t('ui.total_outstanding_f85ec2ae')}</p>
          <p className="text-2xl font-bold text-danger">{SuperadminInvoicesFormatCurrency(totalUnpaid, 'INR', locale)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(agingBuckets).map(([bucket, data]) => (<div key={bucket} className="bg-input border border-border rounded-xl p-4 shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider">{bucket}</h3>
              <p className="text-2xl font-bold text-primary mt-2">{SuperadminInvoicesFormatCurrency(data.amount, data.currency || 'INR', locale)}</p>
              <p className="text-xs text-secondary mt-1">{data.count} {t('ui.invoices_56deca22')}</p>
            </div>
            {data.invoices.length > 0 && (<div className="mt-4 pt-4 border-t border-border max-h-32 overflow-y-auto scrollbar-thin">
                {data.invoices.map(inv => (<div key={inv.id} className="flex justify-between text-xs py-1">
                    <span className="text-primary truncate max-w-24" title={displayValue(inv.tenantName)}>{displayValue(inv.tenantName)}</span>
                    <span className="font-medium text-secondary">{SuperadminInvoicesFormatCurrency(inv.amount, inv.currency || 'INR', locale)}</span>
                  </div>))}
              </div>)}
          </div>))}
      </div>
    </div>);
}

