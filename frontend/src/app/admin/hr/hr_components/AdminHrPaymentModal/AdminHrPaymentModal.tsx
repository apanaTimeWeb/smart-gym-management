"use client";
import { formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: Renders/orchestrates AdminHrPaymentModal for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { useState, useEffect } from 'react';
import { IndianRupee, X } from 'lucide-react';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';

export default function AdminHrPaymentModal() {
  const { paymentModal, setPaymentModal, markPayrollPaid } = useHrContext();
  const [amount, setAmount] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prevModal, setPrevModal] = useState(paymentModal);
  if (paymentModal !== prevModal) {
    setPrevModal(paymentModal);
    if (paymentModal) setAmount(paymentModal.pendingAmount);
  }

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
    <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
      <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200 border border-border/5">
        <div className="p-5 flex justify-between items-center border-b border-border">
          <h3 className="font-bold text-foreground">Pay Salary</h3>
          <button type="button" onClick={() => setPaymentModal(null)} className="p-1.5 text-secondary hover:text-foreground hover:bg-card/10 rounded-md motion-safe:transition-colors"><X size={18} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-card/5 border border-border/5 mb-2">
            <p className="text-sm text-secondary mb-1">
              Staff: <strong className="text-foreground">{paymentModal.staffName}</strong>
            </p>
            <p className="text-sm text-secondary">
              Pending: <strong className="text-danger font-bold text-lg">{formatCurrency(paymentModal.pendingAmount)}</strong>
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-secondary uppercase">Amount Paying</label>
              <button 
                type="button" 
                onClick={() => setAmount(paymentModal.pendingAmount)}
                className="text-xs font-bold text-primary hover:text-primary/80 motion-safe:transition-colors"
              >
                Pay Full
              </button>
            </div>
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
                onChange={(e) => {
                  const val = e.target.value;
                  setAmount(val === '' ? '' : Number(val));
                }}
                className="w-full pl-9 pr-4 py-2.5 bg-input/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground motion-safe:transition-all"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting || Number(amount) <= 0 || Number(amount) > paymentModal.pendingAmount}
              className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 motion-safe:transition-all motion-safe:hover:scale-105 motion-safe:active:scale-95 shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              {isSubmitting ? 'Recording...' : 'Confirm Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
