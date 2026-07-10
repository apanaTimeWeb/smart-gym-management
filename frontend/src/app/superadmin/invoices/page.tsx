'use client';

import { useState } from 'react';
import { DUMMY_INVOICES } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';
import { Receipt, Search, Filter, DollarSign, ArrowUpRight, AlertCircle } from 'lucide-react';
import { SaaSInvoice } from '@/app/superadmin/superadmin_types/superadmin_types';

const StatusColors: Record<SaaSInvoice['status'], string> = {
  PAID: 'text-[var(--success)] bg-[var(--success)]/10',
  PENDING: 'text-[var(--warning)] bg-[var(--warning)]/10',
  FAILED: 'text-[var(--danger)] bg-[var(--danger)]/10',
};

export default function SaaSInvoicesPage() {
  const [search, setSearch] = useState('');

  const filtered = DUMMY_INVOICES.filter(i => 
    i.tenantName.toLowerCase().includes(search.toLowerCase()) || 
    i.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = DUMMY_INVOICES.filter(i => i.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
  const failedRevenue = DUMMY_INVOICES.filter(i => i.status === 'FAILED').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">SaaS Revenue & Invoices</h1>
          <p className="text-[var(--text-secondary)] mt-1">Track actual payments from gym owners via Stripe/Razorpay.</p>
        </div>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2">
          <ArrowUpRight size={18} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 flex items-center gap-4">
          <div className="p-4 bg-[var(--success)]/10 rounded-xl text-[var(--success)]">
            <DollarSign size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Total Collected (This Month)</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-[var(--bg-card)] border border-[var(--danger)]/30 rounded-xl p-6 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--danger)]/5 rounded-bl-full -z-10"></div>
          <div className="p-4 bg-[var(--danger)]/10 rounded-xl text-[var(--danger)]">
            <AlertCircle size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Failed Payments</p>
            <p className="text-3xl font-bold text-[var(--danger)]">${failedRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search by invoice ID or gym name..." 
              className="w-full pl-9 pr-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <Filter size={16} /> Filter Failed
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[var(--bg-header)] border-b border-[var(--border)] text-sm">
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Invoice ID</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Gym (Tenant)</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Plan</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Amount</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Status</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Date</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-[var(--bg-input)] transition-colors">
                  <td className="p-4 text-sm font-mono text-[var(--text-secondary)]">{inv.id}</td>
                  <td className="p-4 text-sm font-bold text-[var(--text-primary)]">{inv.tenantName}</td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{inv.planName}</td>
                  <td className="p-4 text-sm font-bold text-[var(--text-primary)]">
                    ${inv.amount.toFixed(2)} {inv.currency}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${StatusColors[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{new Date(inv.date).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button className="text-sm font-medium text-[var(--primary)] hover:underline flex items-center gap-1 justify-end w-full">
                      <Receipt size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[var(--text-disabled)]">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
