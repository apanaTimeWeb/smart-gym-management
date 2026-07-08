"use client";

import { Printer } from 'lucide-react';
import { useMembersContext } from '../../members_context/MembersContext';
import { formatCurrency } from '../../members_utils/MembersSharedConstants';

export default function ProfilePayments() {
 const { payments, handlePrint } = useMembersContext();

 const totalPaid = payments.filter(p => p.status === 'PAID').reduce((s, p) => s + p.amount, 0);
 const totalDue = payments.filter(p => p.status === 'DUE').reduce((s, p) => s + p.amount, 0);

 return (
 <div>
 <div className="grid grid-cols-3 gap-4 mb-5">
 <div className="bg-[var(--success-bg)] rounded-xl p-4 border border-green-100 ">
 <p className="text-xs text-green-800 dark:text-[var(--success)]">Total Paid</p>
 <p className="text-xl font-bold text-[var(--success)] dark:text-[var(--success)]">{formatCurrency(totalPaid)}</p>
 </div>
 <div className="bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)] rounded-xl p-4 border border-red-100 ">
 <p className="text-xs text-red-800 dark:text-[var(--danger)]">Total Due</p>
 <p className="text-xl font-bold text-[var(--danger)] dark:text-[var(--danger)]">{formatCurrency(totalDue)}</p>
 </div>
 <div className="bg-[var(--info-bg)] rounded-xl p-4 border border-blue-100 ">
 <p className="text-xs text-blue-800 dark:text-[var(--info)]">Transactions</p>
 <p className="text-xl font-bold text-[var(--info)] dark:text-[var(--info)]">{payments.length}</p>
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
 <p className="text-sm font-bold text-[var(--success)] dark:text-[var(--success)]">{formatCurrency(p.amount)}</p>
 <span className={`text-xs px-2 py-0.5 rounded-full ${
 p.status === 'PAID' ? 'bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]' 
 : 'bg-[var(--danger-bg)] text-[var(--danger)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger)]'
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
