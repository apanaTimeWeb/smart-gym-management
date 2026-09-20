'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { formatDate , formatCurrencyFromMinorUnits} from '@/lib/formatters';
// RESPONSIBILITY: Renders the payment history and transaction records for a specific member profile.
import { Printer, MessageCircle } from 'lucide-react';
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import { useFetchPayments } from '@/app/manager/members/members_api/ManagerUseManagerMembersQueries';

export default function ManagerProfilePayments() {
  const { handlePrint, handleSharePaymentWhatsApp, setShowRenewModal, setShowPaymentModal, selectedMember } = useManagerMembersLogic();
  const { data: payments = [] } = useFetchPayments(selectedMember?.id || '');

  const safePayments = payments || [];
  const totalPaid = safePayments.filter(p => p.status === 'PAID').reduce((s, p) => s + p.amount, 0);
  const totalDue = selectedMember?.pendingAmount || 0;

  // Sort payments chronologically (newest first)
  const sortedPayments = [...safePayments].sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());

  return (
  <div>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
  <div className="bg-success-bg rounded-xl p-4 border border-success/20">
  <p className="text-xs text-success">Total Paid</p>
  <p className="text-xl font-bold text-success">{formatCurrencyFromMinorUnits(totalPaid, ManagerEnvConfig.currencyCode)}</p>
  </div>
  <div className="bg-danger-bg rounded-xl p-4 border border-border/20">
  <p className="text-xs text-danger">Total Due</p>
  <p className="text-xl font-bold text-danger">{formatCurrencyFromMinorUnits(totalDue, ManagerEnvConfig.currencyCode)}</p>
  </div>
  <div className="bg-primary-subtle rounded-xl p-4 border border-primary/20">
  <p className="text-xs text-primary">Advance</p>
  <p className="text-xl font-bold text-primary">{formatCurrencyFromMinorUnits(selectedMember?.advanceAmount || 0, ManagerEnvConfig.currencyCode)}</p>
  </div>
  <div className="bg-info-bg rounded-xl p-4 border border-info/20">
  <p className="text-xs text-info">Transactions</p>
  <p className="text-xl font-bold text-info">{safePayments.length}</p>
  </div>
  </div>
  <div className="flex justify-end mb-4 gap-3">
    <button onClick={() => setShowPaymentModal(true)} className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary-subtle motion-safe:transition-colors shadow-card">
      Record Payment
    </button>
    <button onClick={() => setShowRenewModal(true)} className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary/90 motion-safe:transition-colors shadow-card">
      Renew Membership
    </button>
  </div>
  <div className="space-y-3">
  {sortedPayments.length === 0 && (
  <p className="text-center text-secondary text-sm py-4">No payment records found.</p>
  )}
  {sortedPayments.map(p => (
  <div key={p.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
  <div>
  <p className="text-sm font-medium text-primary">{p.invoiceNumber}</p>
  <p className="text-xs text-secondary">{p.method} · {formatDate(p.paidAt)}</p>
 </div>
 <div className="flex items-center gap-3">
 <div className="text-right">
 <p className="text-sm font-bold text-success">{formatCurrencyFromMinorUnits(p.amount, ManagerEnvConfig.currencyCode)}</p>
 <span className={`text-xs px-2 py-0.5 rounded-full ${
 p.status === 'PAID' ? 'bg-success text-on-success' 
 : 'bg-danger text-on-danger'
 }`}>
 {p.status}
 </span>
 </div>
 <div className="flex items-center gap-2">
 <button 
 onClick={() => handleSharePaymentWhatsApp(p)} 
 className="p-2 rounded-lg bg-input hover:bg-success-bg text-secondary hover:text-success motion-safe:transition-colors"
 title="Share via WhatsApp"
 >
 <MessageCircle size={18} />
 </button>
 <button 
 onClick={() => handlePrint(p)} 
 className="p-2 rounded-lg bg-input hover:bg-primary-subtle text-secondary motion-safe:transition-colors"
 title="Print Receipt"
 >
 <Printer size={18} />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}

