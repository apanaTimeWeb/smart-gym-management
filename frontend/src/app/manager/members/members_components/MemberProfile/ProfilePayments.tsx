// RESPONSIBILITY: Renders the payment history and transaction records for a specific member profile.
'use client';

import { Printer } from 'lucide-react';
import { useMembersContext } from '@/app/manager/members/members_context/MembersContext';
import { useMembersStore } from '@/app/manager/members/members_store/useMembersStore';
import { formatCurrency } from '@/app/manager/members/members_utils/MembersSharedConstants';

export default function ProfilePayments() {
 const { handlePrint } = useMembersContext();
 const payments = useMembersStore(s => s.payments);

 const totalPaid = payments.filter(p => p.status === 'PAID').reduce((s, p) => s + p.amount, 0);
 const totalDue = payments.filter(p => p.status === 'DUE').reduce((s, p) => s + p.amount, 0);

 return (
 <div>
 <div className="grid grid-cols-3 gap-4 mb-5">
 <div className="bg-success-bg rounded-xl p-4 border border-success/20">
 <p className="text-xs text-success">Total Paid</p>
 <p className="text-xl font-bold text-success">{formatCurrency(totalPaid)}</p>
 </div>
 <div className="bg-danger-bg rounded-xl p-4 border border-destructive/20">
 <p className="text-xs text-danger">Total Due</p>
 <p className="text-xl font-bold text-danger">{formatCurrency(totalDue)}</p>
 </div>
 <div className="bg-info-bg rounded-xl p-4 border border-info/20">
 <p className="text-xs text-info">Transactions</p>
 <p className="text-xl font-bold text-info">{payments.length}</p>
 </div>
 </div>
 <div className="space-y-3">
 {payments.length === 0 && (
 <p className="text-center text-secondary text-sm py-4">No payment records found.</p>
 )}
 {payments.map(p => (
 <div key={p.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
 <div>
 <p className="text-sm font-medium text-foreground">{p.invoiceNo}</p>
 <p className="text-xs text-secondary">{p.method} · {new Date(p.paidAt).toLocaleDateString('en-IN')}</p>
 </div>
 <div className="flex items-center gap-3">
 <div className="text-right">
 <p className="text-sm font-bold text-success">{formatCurrency(p.amount)}</p>
 <span className={`text-xs px-2 py-0.5 rounded-full ${
 p.status === 'PAID' ? 'bg-success-bg text-success' 
 : 'bg-danger-bg text-danger'
 }`}>
 {p.status}
 </span>
 </div>
 <button 
 onClick={() => handlePrint(p)} 
 className="p-2 rounded-lg bg-input hover:bg-primary-subtle text-secondary transition-colors"
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

