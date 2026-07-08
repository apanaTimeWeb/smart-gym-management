"use client";

import { pendingReport } from '../../sales_utils/SalesSharedConstants';

export default function PendingPayments() {
 return (
 <div>
 <p className="text-sm text-[var(--sales-text-secondary)] mb-4">
 {pendingReport.length} members with pending payments
 </p>
 <div className="space-y-3">
 {pendingReport.map((p, i) => (
 <div key={i} className="flex items-center justify-between p-4 border border-[var(--sales-border)] rounded-xl hover:border-[var(--warning)] dark:hover:border-[var(--warning)] transition-colors bg-[var(--sales-bg-card)]">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)] rounded-full flex items-center justify-center text-[var(--danger)] dark:text-[var(--danger)] font-semibold text-sm">
 {p.name.charAt(0)}
 </div>
 <div>
 <p className="font-medium text-[var(--sales-text-primary)]">{p.name}</p>
 <p className="text-xs text-[var(--sales-text-secondary)]">{p.plan} Plan</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-right">
 <p className="font-bold text-[var(--danger)] dark:text-[var(--danger)]">{p.amount}</p>
 <p className="text-xs text-[var(--sales-text-secondary)] opacity-80">{p.overdue} days overdue</p>
 </div>
 <button 
 className="px-3 py-1.5 text-xs text-white rounded-lg font-medium transition-opacity hover:opacity-90" 
 style={{ background: 'var(--sales-highlight)' }}
 >
 Send Reminder
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
