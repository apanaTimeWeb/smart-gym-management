// RESPONSIBILITY: Renders/orchestrates SuperadminInvoicesLogPaymentModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminInvoicesLogPaymentModal owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesManualPaymentForm, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesLogPaymentModalTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the documented Superadmin manual-payment form and delegates submission to the feature hook.
import { X, Search, DollarSign, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useSuperadminInvoicesManualPaymentForm } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesManualPaymentForm';

import type { SuperadminInvoicesLogPaymentModalProps } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesLogPaymentModalTypes';



/**
 * @description Renders the documented Superadmin manual-payment form and delegates submission to the feature hook.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminInvoicesLogPaymentModal({
  onClose,
  selectedGym,
  isGymDropdownOpen,
  setIsGymDropdownOpen,
  gymSearchTerm,
  setGymSearchTerm,
  filteredTenantsForDropdown,
  handleSelectGym,
  onSave,
  isSaving,
}: SuperadminInvoicesLogPaymentModalProps) {
  const t = useTranslations('superadmin_invoices');
  const { register, handleSubmit, errors, isSubmitting } = useSuperadminInvoicesManualPaymentForm(onSave);
  const submitDisabled = isSaving || isSubmitting || !selectedGym;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-invoices-log-payment-title" data-testid="superadmin_invoices-log-payment-dialog">
      <button type="button" aria-label={t('ui.close_manual_payment_dialog_8fcf0aba')} className="absolute inset-0 bg-overlay-backdrop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={onClose}  data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-close-manual-payment-dialog"/>
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-base">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 id="superadmin-invoices-log-payment-title" className="text-xl font-bold text-primary">{t('ui.log_manual_payment_e15e5207')}</h2>
            <p className="mt-1 text-xs text-secondary">{t('ui.record_the_amount_for_the_selected_gym_ed2152aa')}</p>
          </div>
          <button type="button" onClick={onClose} className="min-h-11 min-w-11 rounded-lg text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('ui.close_modal_a2071564')} data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-payment-modal-close-modal">
            <X size={18} className="mx-auto" aria-hidden="true"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate data-testid="superadmin_invoices-superadmininvoiceslogpaymentmodal-form-1">
          <div className="space-y-4 p-5">
            <div className="relative">
              <label htmlFor="superadmin-invoices-gym" className="mb-1.5 block text-sm font-medium text-secondary">{t('ui.select_gym_e1eeb492')}</label>
              <button id="superadmin-invoices-gym" type="button" aria-expanded={isGymDropdownOpen} aria-haspopup="listbox" className="flex min-h-11 w-full items-center justify-between rounded-lg border border-border bg-input px-4 py-2.5 text-left text-sm text-primary hover:border-focus motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" onClick={() => setIsGymDropdownOpen(!isGymDropdownOpen)} data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-modal-superadmin-invoices-gym">
                <span className={selectedGym ? 'text-primary' : 'text-secondary'}>
                  {selectedGym ? `${selectedGym.name} (${selectedGym.plan})` : '-- Choose Gym --'}
                </span>
                <span className="text-secondary text-xs" aria-hidden="true">{t('ui.text_af398179')}</span>
              </button>
              {isGymDropdownOpen && (
                <div className="absolute left-0 right-0 top-full z-30 mt-1 flex max-h-64 flex-col overflow-hidden rounded-lg border border-border bg-overlay shadow-popover motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-fast" role="listbox" aria-label={t('ui.gym_options_7fcc88ec')} data-testid="superadmin_invoices-log-payment-gym-options">
                  <div className="border-b border-border bg-header p-2">
                    <label htmlFor="superadmin-invoices-gym-search" className="sr-only">{t('ui.search_gym_by_name_00953b4c')}</label>
                    <div className="relative">
                      <Search size={18} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
                      <input id="superadmin-invoices-gym-search" type="text" placeholder={t('ui.search_gym_by_name_ee344db0')} className="min-h-11 w-full rounded border border-border bg-input py-1.5 pl-8 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" value={gymSearchTerm} onChange={(event) => setGymSearchTerm(event.target.value)} autoFocus data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-superadmin-invoices-gym-search"/>
                    </div>
                  </div>
                  <div className="overflow-y-auto p-1">
                    {filteredTenantsForDropdown.map((tenant) => (
                      <button type="button" role="option" aria-selected={selectedGym?.id === tenant.id} key={tenant.id} className="min-h-11 w-full rounded-md px-3 py-2.5 text-left text-sm text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" onClick={() => handleSelectGym(tenant.id)} data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-log-payment-modal-button">
                        <span className="font-bold">{tenant.name}</span>
                        <span className="ml-1 text-xs text-secondary">{t('ui.text_84c40473')}{tenant.plan}{t('ui.text_9371d7a2')}</span>
                      </button>
                    ))}
                    {filteredTenantsForDropdown.length === 0 && (<div className="px-3 py-6 text-center text-sm font-medium text-disabled">{t('ui.no_gyms_found_ce3950ee')}</div>)}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="superadmin-invoices-payment-amount" className="mb-1.5 block text-sm font-medium text-secondary">{t('ui.amount_b2f40690')}<span className="text-danger" aria-hidden="true">{t('ui.text_3389dae3')}</span></label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
                <input id="superadmin-invoices-payment-amount" type="number" min="0" step="0.01" inputMode="decimal" {...register('amount')} aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? 'superadmin-invoices-payment-amount-error' : undefined} className="min-h-11 w-full rounded-lg border border-border bg-input py-2.5 pl-9 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" placeholder={t('ui.e_g_4999_895d4ec7')} data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-superadmin-invoices-payment-amount"/>
              </div>
              {errors.amount?.message && <p id="superadmin-invoices-payment-amount-error" className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_invoices-log-payment-amount-error">{errors.amount.message}</p>}
              {!selectedGym && <p className="mt-1 text-xs text-danger" role="status" data-testid="superadmin_invoices-log-payment-gym-required">{t('ui.select_a_gym_before_saving_the_payment_ceab5dc8')}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-header p-5">
            <button type="button" onClick={onClose} disabled={isSaving} className="min-h-11 rounded-lg border border-border bg-input px-4 py-2 text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50" data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-log-payment-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" disabled={submitDisabled} className="flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-log-payment-modal-submit">
              {(isSaving || isSubmitting) && <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"/>}
              {isSaving || isSubmitting ? 'Saving…' : 'Save Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
