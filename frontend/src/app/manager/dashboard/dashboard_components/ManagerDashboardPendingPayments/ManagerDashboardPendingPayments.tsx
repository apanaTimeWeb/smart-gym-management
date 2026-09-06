// RESPONSIBILITY: Renders the pending payments list on the dashboard with a local search filter.
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useDashboardContext } from '@/app/manager/dashboard/dashboard_context/ManagerDashboardContext';
import { formatCurrency } from '@/app/manager/dashboard/dashboard_utils/ManagerDashboardSharedConstants';

export default function PendingPayments() {
  const { stats } = useDashboardContext();
  const [search, setSearch] = useState('');

  if (!stats) return null;
  const list = stats.pendingPaymentsList || [];

  const filtered = list.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl shadow-sm border p-5 bg-card border-border">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="font-semibold text-primary">Pending Payments</h2>
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full pl-8 pr-3 py-1.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page bg-input text-primary"
        />
      </div>

      <div className="space-y-3">
        {filtered.slice(0, 6).map(p => (
          <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0 border-border">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-danger-bg text-danger">
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-primary">{p.name}</p>
                <p className="text-xs text-secondary">
                  Expires: {new Date(p.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-danger">{formatCurrency(p.pendingAmount)}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-center py-4 text-secondary">
            {search ? `No results for "${search}"` : 'No pending payments 🎉'}
          </p>
        )}
      </div>

      <Link href="/manager/finance" className="mt-3 block w-full text-center text-sm font-medium text-primary">
        View all pending
      </Link>
    </div>
  );
}
