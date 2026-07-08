"use client";

import Link from 'next/link';
import { useDashboardContext } from '../../dashboard_context/DashboardContext';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function PendingPayments() {
 const { stats } = useDashboardContext();
 if (!stats) return null;
 const s = stats;

 return (
 <div className="rounded-xl shadow-sm border p-5 dashboard-module" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
 <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Pending Payments</h2>
 <div className="space-y-3">
 {(s.pendingPaymentsList || []).slice(0, 5).map((p) => (
 <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
 <div>
 <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
 <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
 Expires: {new Date(p.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
 </p>
 </div>
 <div className="text-right">
 <p className="text-sm font-bold" style={{ color: 'var(--danger)' }}>{fmt(p.pendingAmount)}</p>
 </div>
 </div>
 ))}
 {(s.pendingPaymentsList || []).length === 0 && (
 <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>No pending payments 🎉</p>
 )}
 </div>
 <Link href="/finance" className="mt-3 block w-full text-center text-sm font-medium" style={{ color: 'var(--primary)' }}>
 View all pending
 </Link>
 </div>
 );
}
