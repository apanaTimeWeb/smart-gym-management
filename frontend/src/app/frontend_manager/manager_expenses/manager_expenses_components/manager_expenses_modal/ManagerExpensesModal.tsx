// RESPONSIBILITY: Renders ManagerExpensesModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Loader2, X, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { EXPENSE_CATEGORIES, EXPENSE_STATUS_LABELS, MANAGER_EXPENSE_MAX_AMOUNT_MAJOR_UNITS } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesSharedConstants';
import { useManagerExpensesForm } from '@/app/frontend_manager/manager_expenses/manager_expenses_hooks/useManagerExpensesForm';


/** @description Renders the ManagerExpensesModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerExpensesModal() {
  const t = useTranslations('MANAGER_EXPENSES');

  const { showModal, editId, form, handleClose, submit } = useManagerExpensesForm();
  const { register, control, formState: { errors, isSubmitting } } = form;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-visible border border-border max-h-full flex flex-col" role="dialog" aria-modal="true" aria-labelledby="managerexpensesmodal-dialog-title">
        <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between z-20 rounded-t-2xl">
          <h3 className="text-lg font-bold text-primary" id="managerexpensesmodal-dialog-title">{editId ? t('COPY_EDIT_EXPENSE') : t('COPY_ADD_EXPENSE')}</h3>
          <button data-testid="manager_expenses-manager-expenses-modal-close-1"
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg motion-safe:transition-all hover:bg-primary-subtle text-secondary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
            aria-label={t("COPY_CLOSE_MODAL")}
          >
            <X size={18} strokeWidth={2}/>
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <form data-testid="manager_expenses-managerexpensesmodal-form-1" onSubmit={submit} className="p-6 space-y-4 pb-32">
            <div>
              <label htmlFor="manager-managerexpensesmodal-field-1" className="block text-sm font-medium text-secondary mb-1">{t("COPY_TITLE")}</label>
              <input id="manager-managerexpensesmodal-field-1" data-testid="manager_expenses-manager-expenses-modal-input-text-1"
                type="text"
                placeholder={t("COPY_E_G_OCTOBER_ELECTRICITY_BILL")}
                {...register('title')}
                className={[`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all ${
                  errors.title ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                }`, "motion-safe:duration-base ease-in-out"].filter(Boolean).join(' ')} aria-invalid={errors.title ? 'true' : undefined} aria-describedby={errors.title ? 'managerexpensesmodal-title-error' : undefined} />
              {errors.title && <p id="managerexpensesmodal-title-error" className="text-danger text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">{t("COPY_CATEGORY")}</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <ManagerSearchableDropdown ariaLabel={t("COPY_CATEGORY")} ariaInvalid={Boolean(errors.category)} ariaDescribedBy={errors.category ? 'managerexpensesmodal-category-error' : undefined} dataTestId="manager_expenses-managerexpensesmodal-managersearchabledropdown-1"
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={EXPENSE_CATEGORIES.map(c => ({ label: c, value: c }))}
                    placeholder={t("COPY_SELECT_CATEGORY")}
                   data-testid="manager_expenses-managerexpensesmodal-searchable-dropdown-1"/>
                )}
              />
              {errors.category && <p id="managerexpensesmodal-category-error" className="text-danger text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="manager-managerexpensesmodal-field-2" className="block text-sm font-medium text-secondary mb-1">{t("COPY_AMOUNT")}</label>
                <input id="manager-managerexpensesmodal-field-2" data-testid="manager_expenses-manager-expenses-modal-input-number"
                  type="number"
                  min="0"
                  max={MANAGER_EXPENSE_MAX_AMOUNT_MAJOR_UNITS}
                  step="0.01"
                  placeholder={t("TEXT_AMOUNT_EXAMPLE")}
                  {...register('amount', { valueAsNumber: true })}
                  className={[`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all ${
                    errors.amount ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`, "motion-safe:duration-base ease-in-out"].filter(Boolean).join(' ')} aria-invalid={errors.amount ? 'true' : undefined} aria-describedby={errors.amount ? 'managerexpensesmodal-amount-error' : undefined} />
                {errors.amount && <p id="managerexpensesmodal-amount-error" className="text-danger text-xs mt-1">{errors.amount.message}</p>}
              </div>
              <div>
                <label htmlFor="manager-managerexpensesmodal-field-3" className="block text-sm font-medium text-secondary mb-1">{t("COPY_DATE")}</label>
                <input id="manager-managerexpensesmodal-field-3" data-testid="manager_expenses-manager-expenses-modal-input-date"
                  type="date"
                  {...register('date')}
                  className={[`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all ${
                    errors.date ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`, "motion-safe:duration-base ease-in-out"].filter(Boolean).join(' ')} aria-invalid={errors.date ? 'true' : undefined} aria-describedby={errors.date ? 'managerexpensesmodal-date-error' : undefined} />
                {errors.date && <p id="managerexpensesmodal-date-error" className="text-danger text-xs mt-1">{errors.date.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="manager-managerexpensesmodal-field-4" className="block text-sm font-medium text-secondary mb-1">{t("COPY_STATUS")}</label>
              <select id="manager-managerexpensesmodal-field-4" data-testid="manager_expenses-manager-expenses-modal-select-option"
                {...register('status')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all border-border focus-visible:ring-primary motion-safe:duration-base ease-in-out"
              >
                {Object.entries(EXPENSE_STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val} data-testid="manager_expenses-managerexpensesmodal-interactive">{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="manager-managerexpensesmodal-field-5" className="block text-sm font-medium text-secondary mb-1">{t("COPY_REFERENCE_INVOICE_NO_OPTIONAL")}</label>
              <input id="manager-managerexpensesmodal-field-5" data-testid="manager_expenses-manager-expenses-modal-input-text-2"
                type="text"
                placeholder={t("COPY_E_G_INV_2023_001")}
                {...register('referenceNo')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all border-border focus-visible:ring-primary motion-safe:duration-base ease-in-out"
              />
            </div>
            
            <div>
              <label htmlFor="manager-managerexpensesmodal-field-6" className="block text-sm font-medium text-secondary mb-1">{t("COPY_RECEIPT_URL_OPTIONAL")}</label>
              <input id="manager-managerexpensesmodal-field-6" data-testid="manager_expenses-manager-expenses-modal-input-value"
                type="url"
                placeholder={t("COPY_HTTPS_EXAMPLE_COM_RECEIPT_JPG")}
                {...register('receiptUrl')}
                className={[`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all ${
                  errors.receiptUrl ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                }`, "motion-safe:duration-base ease-in-out"].filter(Boolean).join(' ')} aria-invalid={errors.receiptUrl ? 'true' : undefined} aria-describedby={errors.receiptUrl ? 'managerexpensesmodal-receiptUrl-error' : undefined} />
              {errors.receiptUrl && (
                <p className="text-danger text-xs mt-1">{errors.receiptUrl.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="manager-managerexpensesmodal-field-7" className="block text-sm font-medium text-secondary mb-1">{t("COPY_NOTES_OPTIONAL")}</label>
              <textarea id="manager-managerexpensesmodal-field-7" data-testid="manager_expenses-manager-expenses-modal-textarea-message-input"
                rows={3}
                placeholder={t("COPY_ANY_ADDITIONAL_DETAILS")}
                {...register('notes')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all border-border focus-visible:ring-primary resize-none motion-safe:duration-base ease-in-out"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button data-testid="manager_expenses-manager-expenses-modal-close-2"
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
              >{t("COPY_CANCEL")}</button>
              <button data-testid="manager_expenses-manager-expenses-modal-button-submit"
                type="submit"
                disabled={isSubmitting}
                className="min-w-32 flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
              >
                {(() => { if (isSubmitting) { return <Loader2 size={18} strokeWidth={2} className="text-on-primary motion-safe:animate-spin" />; } return <><Save size={18} strokeWidth={2}/>{editId ? t('COPY_UPDATE') : t('CONFIRM_EXPENSE_SAVE')}</>; })()
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
