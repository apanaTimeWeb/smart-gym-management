'use client';
// DATA FLOW: Payroll payment selection → useManagerHrPaymentModalState → HR payment modal fields.

import { useEffect, useState } from 'react';
import { fromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';

/**
 * @description Owns the editable payment amount and submitting flag for the HR salary-payment modal.
 * @dependencies ManagerMoney conversion plus React state/lifecycle.
 * @edge-case Rehydrates the draft amount whenever a different payroll payment modal opens.
 */
export function useManagerHrPaymentModalState(paymentModal: { payrollId: string; staffName: string; pendingAmount: number } | null) {
  const [amount, setAmount] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EFFECT: Rehydrate the editable amount when the selected payroll payment modal identity/value changes.
  useEffect(() => {
    if (paymentModal) setAmount(fromManagerMinorUnits(paymentModal.pendingAmount));
  }, [paymentModal]);

  return { amount, setAmount, isSubmitting, setIsSubmitting };
}
