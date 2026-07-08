"use client";

import { Printer } from 'lucide-react';
import { useMembersContext } from '../../members_context/MembersContext';
import { formatCurrency } from '../../members_utils/MembersSharedConstants';

export default function ProfilePayments() {
  const { payments, handlePrint } = useMembersContext();

  const totalPaid = payments.filter(p => p.status === 'PAID').reduce((s, p) => s + p.amount, 0);
  const totalDue  = payments.filter(p => p.status === 'DUE').reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-100 dark:border-green-900/50">
          <p className="text-xs text-green-800 dark:text-green-400">Total Paid</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-500">{formatCurrency(totalPaid)}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 border border-red-100 dark:border-red-900/50">
          <p className="text-xs text-red-800 dark:text-red-400">Total Due</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-500">{formatCurrency(totalDue)}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900/50">
          <p className="text-xs text-blue-800 dark:text-blue-400">Transactions</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-500">{payments.length}</p>
        </div>
      </div>
      <div className="space-y-3">
        {payments.length === 0 && (
          <p className="text-center text-[var(--members-text-secondary)] text-sm py-4">No payment records found.</p>
        )}
        {payments.map(p => (
          <div key={p.id} className="flex items-center justify-between p-3 border border-[var(--members-border)] rounded-lg bg-[var(--members-bg-card)]">
            <div>
              <p className="text-sm font-medium text-[var(--members-text-primary)]">{p.invoiceNo}</p>
              <p className="text-xs text-[var(--members-text-secondary)]">{p.method} · {new Date(p.paidAt).toLocaleDateString('en-IN')}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-green-600 dark:text-green-500">{formatCurrency(p.amount)}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  p.status === 'PAID' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                }`}>
                  {p.status}
                </span>
              </div>
              <button 
                onClick={() => handlePrint(p)} 
                className="p-2 rounded-lg bg-[var(--members-bg-input)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--members-text-secondary)] transition-colors"
              >
                <Printer size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
