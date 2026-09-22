// RESPONSIBILITY: Renders a modal to record a new payment for a member.
'use client';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';

import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import { MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { FormEvent } from 'react';
import { useLocale } from "next-intl";

export default function ManagerAddPaymentModal() {
    const locale = useLocale();
  const { showPaymentModal, setShowPaymentModal, recordPayment, selectedMember } = useManagerMembersLogic();
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const [amount, setAmount] = useState<number | ''>('');
  const [method, setMethod] = useState('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { confirmAndClose } = useManagerUnsavedChangesGuard(!!amount && !isSubmitting);
  const handleClose = () => { void confirmAndClose(() => setShowPaymentModal(false)); };

  if (!showPaymentModal || !selectedMember) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    const confirmed = await confirm({ title: 'Confirm Payment', message: `Record this payment of ${formatCurrency(toManagerMinorUnits(Number(amount)), ManagerEnvConfig.currencyCode, locale)} for ${selectedMember?.name ?? 'the member'}?`, confirmText: 'Record Payment', type: 'warning' });
    if (!confirmed) return;
    idempotencyKeyRef.current ??= createManagerIdempotencyKey();
    setIsSubmitting(true);
    try {
      await recordPayment({ amount: Number(amount), method }, idempotencyKeyRef.current!);
      idempotencyKeyRef.current = null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4">
      <div className="bg-overlay w-full max-w-md rounded-2xl shadow-dialog overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">Record Payment</h2>
          <button aria-label="Close payment modal" onClick={handleClose} className="p-2 text-secondary hover:text-primary rounded-full hover:bg-input motion-safe:transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {(selectedMember.pendingAmount > 0 || (selectedMember.advanceAmount && selectedMember.advanceAmount > 0)) && (
            <div className={`p-3 rounded-lg border mb-4 ${selectedMember.pendingAmount > 0 ? 'bg-danger-bg border-border' : 'bg-success-bg border-success'}`}>
              <p className={`text-sm font-semibold ${selectedMember.pendingAmount > 0 ? 'text-danger' : 'text-success'}`}>
                {selectedMember.pendingAmount > 0 
                  ? `Current Dues: ${formatCurrency(selectedMember.pendingAmount, ManagerEnvConfig.currencyCode, locale)}` 
                  : `Advance Balance: ${formatCurrency(selectedMember.advanceAmount || 0, ManagerEnvConfig.currencyCode, locale)}`}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Amount</label>
            <input 
              type="number" 
              required 
              min="1"
              value={amount}
              onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')}
              className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-all"
              placeholder="e.g. 1500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-all"
            >
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
              <option value="CASH">Cash</option>
              <option value="NET_BANKING">Net Banking</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-secondary hover:text-primary bg-input hover:bg-input rounded-xl motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !amount}
              className="min-w-32 flex-1 px-4 py-2.5 text-sm font-semibold text-primary bg-primary-subtle hover:bg-primary-hover rounded-xl motion-safe:transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Recording...' : 'Confirm Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
