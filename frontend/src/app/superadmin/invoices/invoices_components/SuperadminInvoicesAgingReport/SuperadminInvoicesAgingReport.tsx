'use client';
// RESPONSIBILITY: Renders the aging report for unpaid invoices.

import React, { useMemo } from 'react';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';

export default function SuperadminInvoicesAgingReport({ invoices }: { invoices: SaaSInvoice[] }) {
  const { agingBuckets, totalUnpaid } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let total = 0;
    const buckets = {
      'Not Yet Due': { amount: 0, count: 0, invoices: [] as SaaSInvoice[] },
      '0-30 Days': { amount: 0, count: 0, invoices: [] as SaaSInvoice[] },
      '31-60 Days': { amount: 0, count: 0, invoices: [] as SaaSInvoice[] },
      '60+ Days': { amount: 0, count: 0, invoices: [] as SaaSInvoice[] },
    };

    invoices.forEach((inv) => {
      if (inv.status === 'PAID') return;
      
      const amt = Number(inv.amount) || 0;
      total += amt;
      
      const dueDate = new Date(inv.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - dueDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) {
        buckets['Not Yet Due'].amount += amt;
        buckets['Not Yet Due'].count += 1;
        buckets['Not Yet Due'].invoices.push(inv);
      } else if (diffDays <= 30) {
        buckets['0-30 Days'].amount += amt;
        buckets['0-30 Days'].count += 1;
        buckets['0-30 Days'].invoices.push(inv);
      } else if (diffDays <= 60) {
        buckets['31-60 Days'].amount += amt;
        buckets['31-60 Days'].count += 1;
        buckets['31-60 Days'].invoices.push(inv);
      } else {
        buckets['60+ Days'].amount += amt;
        buckets['60+ Days'].count += 1;
        buckets['60+ Days'].invoices.push(inv);
      }
    });

    return { agingBuckets: buckets, totalUnpaid: total };
  }, [invoices]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Accounts Receivable Aging</h2>
        <div className="text-right">
          <p className="text-sm text-secondary">Total Outstanding</p>
          <p className="text-2xl font-bold text-danger">₹{totalUnpaid.toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(agingBuckets).map(([bucket, data]) => (
          <div key={bucket} className="bg-input border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider">{bucket}</h3>
              <p className="text-2xl font-bold text-foreground mt-2">₹{data.amount.toLocaleString('en-IN')}</p>
              <p className="text-xs text-secondary mt-1">{data.count} invoices</p>
            </div>
            {data.invoices.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/50 max-h-32 overflow-y-auto scrollbar-thin">
                {data.invoices.map(inv => (
                  <div key={inv.id} className="flex justify-between text-xs py-1">
                    <span className="text-foreground truncate max-w-[100px]" title={inv.tenantName}>{inv.tenantName}</span>
                    <span className="font-medium text-secondary">₹{inv.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
