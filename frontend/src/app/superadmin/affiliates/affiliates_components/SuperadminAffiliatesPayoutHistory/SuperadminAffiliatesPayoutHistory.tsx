'use client';
// RESPONSIBILITY: Renders the payout history for affiliates.

import React, { useMemo } from 'react';
import type { Affiliate } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';

export default function SuperadminAffiliatesPayoutHistory({ affiliates }: { affiliates: Affiliate[] }) {
  // Generate mock payout history based on affiliates
  const payouts = useMemo(() => {
    return affiliates.flatMap((aff, index) => {
      if (aff.commissionEarned <= 0) return [];
      
      const count = Math.max(1, index % 3);
      return Array.from({ length: count }).map((_, i) => ({
        id: `payout-${aff.id}-${i}`,
        affiliateName: aff.name,
        affiliateId: aff.id,
        amount: Math.round(aff.commissionEarned / count),
        status: i === 0 && index % 2 === 0 ? 'PENDING' : 'COMPLETED',
        date: new Date(Date.now() - (i * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        method: i % 2 === 0 ? 'Bank Transfer' : 'PayPal',
        referenceId: `REF-${Math.floor(Math.random() * 100000)}`
      }));
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [affiliates]);

  if (payouts.length === 0) {
    return (
      <div className="p-8 text-center text-secondary border border-border bg-card rounded-xl">
        No payout history available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-card border border-border rounded-xl shadow-sm">
      <table className="w-full text-left border-collapse min-w-max">
        <thead>
          <tr className="bg-primary/10 border-b border-border text-secondary text-sm">
            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Date</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Affiliate</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Amount</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Method</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Ref ID</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {payouts.map((payout) => (
            <tr key={payout.id} className="hover:bg-input/50 motion-safe:transition-colors">
              <td className="p-4 text-sm text-secondary">
                {new Date(payout.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
              </td>
              <td className="p-4">
                <span className="text-foreground font-medium">{payout.affiliateName}</span>
                <span className="block text-xs text-disabled">{payout.affiliateId}</span>
              </td>
              <td className="p-4 font-medium text-foreground">
                ₹{payout.amount.toLocaleString('en-IN')}
              </td>
              <td className="p-4 text-sm text-secondary">{payout.method}</td>
              <td className="p-4 text-xs font-mono text-secondary">{payout.referenceId}</td>
              <td className="p-4">
                {payout.status === 'COMPLETED' ? (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
                    Completed
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-warning/10 text-warning border border-warning/20">
                    Pending
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
