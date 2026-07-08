"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useDashboardContext } from '@/app/(erp)/dashboard/dashboard_context/DashboardContext';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function PendingPayments() {
  const { stats } = useDashboardContext();
  const [search, setSearch] = useState('');

  if (!stats) return null;
  const list = stats.pendingPaymentsList || [];

  const filtered = list.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="rounded-xl shadow-sm border p-5 dashboard-module" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
    {/* Header */}
    <div className="flex items-center justify-between gap-3 mb-3">
      <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Pending Payments</h2>
    </div>

    {/* Search */}
    <div className="relative mb-4">
      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'var(--bg-input)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
        }}
      />
    </div>

    {/* List */}
    <div className="space-y-3">
      {filtered.slice(0, 6).map((p) => (
        <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger)' }}>
              {p.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Expires: {new Date(p.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </p>
            </div>
          </div>
          <p className="text-sm font-bold" style={{ color: 'var(--danger)' }}>{fmt(p.pendingAmount)}</p>
        </div>
      ))}
      {filtered.length === 0 && (
        <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>
          {search ? `No results for "${search}"` : 'No pending payments 🎉'}
        </p>
      )}
    </div>

    <Link href="/finance" className="mt-3 block w-full text-center text-sm font-medium" style={{ color: 'var(--primary)' }}>
      View all pending
    </Link>
  </div>
  );
}
