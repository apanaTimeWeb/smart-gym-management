// RESPONSIBILITY: Renders the module-owned Record Payment dialog; mutation and validation remain in the finance form hook.
'use client';
import { useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useManagerDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/useManagerDialogFocusTrap';
import { useManagerFinancePaymentForm } from '@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinancePaymentForm';

/**
 * @description Presents the Finance record-payment workflow with labelled RHF controls and submit/loading feedback.
 * @dependencies useManagerFinancePaymentForm and zero-business dialog focus infrastructure.
 * @edge-case The dialog preserves invalid form state and closes only after successful mutation reconciliation.
 */
export default function ManagerFinancePaymentModal() {
  const t = useTranslations('MANAGER_FINANCE');
  const ui = useManagerFinancePaymentForm();
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerDialogFocusTrap({ dialogRef, isOpen: true, onClose: ui.close });
  const { register, formState: { errors, isSubmitting } } = ui.form;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4" role="presentation">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="manager-finance-record-payment-title" data-testid="manager_finance-managerfinancepaymentmodal-dialog" className="w-full max-w-lg rounded-2xl border border-border bg-overlay p-6 shadow-dialog">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
          <h2 id="manager-finance-record-payment-title" className="text-lg font-bold text-primary">{t('TEXT_RECORD_PAYMENT')}</h2>
          <button type="button" aria-label={t('TEXT_CLOSE')} data-testid="manager_finance-managerfinancepaymentmodal-button-close" onClick={ui.close} className="min-h-11 min-w-11 rounded-lg text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={ui.submit} className="mt-5 space-y-4" data-testid="manager_finance-managerfinancepaymentmodal-form">
          <div><label htmlFor="manager-finance-payment-member" className="block text-sm font-medium text-secondary">{t('TEXT_MEMBER_ID')}</label><input id="manager-finance-payment-member" {...register('memberId')} data-testid="manager_finance-managerfinancepaymentmodal-input-member-id" className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary" aria-invalid={errors.memberId ? 'true' : undefined} aria-describedby={errors.memberId ? 'managerfinancepaymentmodal-memberId-error' : undefined} />{errors.memberId && <p id="managerfinancepaymentmodal-memberId-error" role="alert" data-testid="manager_finance-managerfinancepaymentmodal-error-member-id" className="mt-1 text-xs text-danger">{errors.memberId.message}</p>}</div>
          <div><label htmlFor="manager-finance-payment-amount" className="block text-sm font-medium text-secondary">{t('TEXT_AMOUNT')}</label><input id="manager-finance-payment-amount" type="number" min="0.01" step="0.01" {...register('amount', { valueAsNumber: true })} data-testid="manager_finance-managerfinancepaymentmodal-input-amount" className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary" aria-invalid={errors.amount ? 'true' : undefined} aria-describedby={errors.amount ? 'managerfinancepaymentmodal-amount-error' : undefined} />{errors.amount && <p id="managerfinancepaymentmodal-amount-error" role="alert" data-testid="manager_finance-managerfinancepaymentmodal-error-amount" className="mt-1 text-xs text-danger">{errors.amount.message}</p>}</div>
          <div><label htmlFor="manager-finance-payment-method" className="block text-sm font-medium text-secondary">{t('TEXT_METHOD')}</label><select id="manager-finance-payment-method" {...register('method')} data-testid="manager_finance-managerfinancepaymentmodal-select-method" className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary"><option value="UPI" data-testid="manager_finance-manager-finance-payment-modal-option-1">{t('TEXT_UPI')}</option><option value="Cash" data-testid="manager_finance-manager-finance-payment-modal-option-2">{t('COPY_CASH')}</option><option value="Card" data-testid="manager_finance-manager-finance-payment-modal-option-3">{t('COPY_CARD')}</option><option value="NetBanking" data-testid="manager_finance-manager-finance-payment-modal-option-4">{t('COPY_NETBANKING')}</option><option value="Cheque" data-testid="manager_finance-manager-finance-payment-modal-option-5">{t('TEXT_CHEQUE')}</option><option value="Other" data-testid="manager_finance-manager-finance-payment-modal-option-6">{t('TEXT_OTHER')}</option></select></div>
          <div><label htmlFor="manager-finance-payment-paid-at" className="block text-sm font-medium text-secondary">{t('TEXT_PAID_AT')}</label><input id="manager-finance-payment-paid-at" type="date" {...register('paidAt')} data-testid="manager_finance-managerfinancepaymentmodal-input-paid-at" className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary" /></div>
          <div><label htmlFor="manager-finance-payment-notes" className="block text-sm font-medium text-secondary">{t('TEXT_NOTES')}</label><textarea id="manager-finance-payment-notes" {...register('notes')} data-testid="manager_finance-managerfinancepaymentmodal-input-notes" rows={3} className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary" /></div>
          <div className="flex justify-end gap-3 border-t border-border pt-4"><button type="button" onClick={ui.close} data-testid="manager_finance-managerfinancepaymentmodal-button-cancel" className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-secondary">{t('TEXT_CANCEL')}</button><button type="submit" disabled={isSubmitting || ui.createPayment.isPending} data-testid="manager_finance-managerfinancepaymentmodal-button-submit" className="flex min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-on-primary disabled:opacity-60">{isSubmitting || ui.createPayment.isPending ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" /> : null}{t('TEXT_SAVE_PAYMENT')}</button></div>
        </form>
      </div>
    </div>
  );
}
