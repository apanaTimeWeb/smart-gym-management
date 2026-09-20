'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders a modal to record a partial or full salary payment for staff.
import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { IndianRupee, X } from 'lucide-react';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { fromManagerMinorUnits, toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';

export default function ManagerHrPaymentModal() {
  const { paymentModal, setPaymentModal, markPayrollPaid } = useManagerHrLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const [amount, setAmount] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { confirmAndClose } = useManagerUnsavedChangesGuard(!!amount && !isSubmitting);
  const handleClose = () => { void confirmAndClose(() => setPaymentModal(null)); };

  // Sync state when modal opens
  useEffect(() => {
    if (paymentModal) {
      setAmount(fromManagerMinorUnits(paymentModal.pendingAmount));
    }
  }, [paymentModal]);

  if (!paymentModal) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    const confirmed = await confirm({ title: 'Confirm Salary Payment', message: `Record ${formatCurrencyFromMinorUnits(toManagerMinorUnits(Number(amount)), ManagerEnvConfig.currencyCode)} as a salary payment for ${paymentModal.staffName}?`, confirmText: 'Record Payment', type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= createManagerIdempotencyKey();
    setIsSubmitting(true);
    try {
      await markPayrollPaid(paymentModal.payrollId, toManagerMinorUnits(Number(amount)), keyRef.current);
      keyRef.current = null;
      setPaymentModal(null);
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
      <div className="bg-overlay/95 backdrop-blur-xl rounded-2xl shadow-dialog w-full max-w-sm overflow-hidden motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200 border border-border">
        <div className="p-5 flex justify-between items-center border-b border-border">
          <h3 className="font-bold text-primary">Pay Salary</h3>
          <button aria-label="Close salary payment modal" type="button" onClick={handleClose} className="p-1.5 text-secondary hover:text-primary hover:bg-primary-subtle rounded-md motion-safe:transition-colors"><X size={18} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-primary-subtle border border-border mb-2">
            <p className="text-sm text-secondary mb-1">
              Staff: <strong className="text-primary">{paymentModal.staffName}</strong>
            </p>
            <p className="text-sm text-secondary">
              Pending: <strong className="text-danger font-bold text-lg">{formatCurrencyFromMinorUnits(paymentModal.pendingAmount, ManagerEnvConfig.currencyCode)}</strong>
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-secondary uppercase">Amount Paying</label>
              <button 
                type="button" 
                onClick={() => setAmount(fromManagerMinorUnits(paymentModal.pendingAmount))}
                className="text-xs font-bold text-primary hover:text-primary/80 motion-safe:transition-colors"
              >
                Pay Full
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee size={18} className="text-secondary" />
              </div>
              <input
                type="number"
                required
                min="1"
                max={fromManagerMinorUnits(paymentModal.pendingAmount)}
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  setAmount(val === '' ? '' : Number(val));
                }}
                className="w-full pl-9 pr-4 py-2.5 bg-input/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-primary motion-safe:transition-all"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting || Number(amount) <= 0 || Number(amount) > fromManagerMinorUnits(paymentModal.pendingAmount)}
              className="w-full py-2.5 bg-primary text-on-primary text-sm font-bold rounded-xl hover:bg-primary/90 motion-safe:transition-all shadow-card disabled:opacity-50 disabled:shadow-none"
            >
              {isSubmitting ? 'Recording...' : 'Confirm Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
