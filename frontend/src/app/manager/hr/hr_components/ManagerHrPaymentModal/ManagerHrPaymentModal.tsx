// RESPONSIBILITY: Renders a modal to record a partial or full salary payment for staff.
'use client';

import { useState } from 'react';
import { IndianRupee, X } from 'lucide-react';
import { formatCurrency } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { useHrContext } from '@/app/manager/hr/hr_context/ManagerHrContext';

export default function ManagerHrPaymentModal() {
  const { paymentModal, setPaymentModal, markPayrollPaid } = useHrContext();
  const [amount, setAmount] = useState<number | ''>(paymentModal?.pendingAmount || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!paymentModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setIsSubmitting(true);
    await markPayrollPaid(paymentModal.payrollId, Number(amount));
    setIsSubmitting(false);
    setPaymentModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden motion-safe:animate-in fade-in zoom-in duration-200 border border-border">
        <div className="p-5 flex justify-between items-center border-b border-border">
          <h3 className="font-bold text-foreground">Pay Salary</h3>
          <button type="button" onClick={() => setPaymentModal(null)} className="p-1 text-secondary hover:bg-input rounded-md transition-colors"><X size={18} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-secondary mb-4">
            Recording payment for <strong className="text-foreground">{paymentModal.staffName}</strong>.
            <br/>Pending Amount: <strong className="text-danger">{formatCurrency(paymentModal.pendingAmount)}</strong>
          </p>

          <div>
            <label className="block text-xs font-semibold text-secondary uppercase mb-1.5">Amount Paying</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee size={14} className="text-secondary" />
              </div>
              <input
                type="number"
                required
                min="1"
                max={paymentModal.pendingAmount}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting || Number(amount) <= 0 || Number(amount) > paymentModal.pendingAmount}
              className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Recording...' : 'Confirm Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
