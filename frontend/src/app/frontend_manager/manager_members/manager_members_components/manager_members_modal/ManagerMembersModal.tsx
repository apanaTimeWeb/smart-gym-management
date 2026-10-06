// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Loader2, X, Save } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Controller } from 'react-hook-form';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import ManagerMembersMemberProfilePictureUpload from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_modal/ManagerMembersMemberProfilePictureUpload';
import { useManagerMembersModalForm } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersModalForm';
import { getPriceForCycle, GENDER_OPTIONS, MEMBER_EDIT_STATUS_OPTIONS, MEMBER_ACTIVE_STATUS, BILLING_CYCLE_CUSTOM, MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, MANAGER_MEMBER_MAX_CUSTOM_DAYS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { MEMBERS_CYCLE_LABELS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersUiConstants';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';
import { useFetchPlans } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersQueries';
import { ManagerMembersFormatCurrency } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersFormSchema';


/** @description Renders the ManagerMembersModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerMembersModal() {
  const t = useTranslations('MANAGER_MEMBERS');
  const locale = useLocale();

  const {
    showAddModal, setShowAddModal, editId, editData,
    saveMember
  } = useManagerMembersLogic();

  const { data: plansData } = useFetchPlans();
  const plans = plansData || [];

  const {
    useFormReturn,
    register,
    handleSubmit,
    errors,
    watchPlanId,
    watchBillingCycle,
    watchCustomDays,
    selectedPlan, handleClose, isSubmitting } = useManagerMembersModalForm(editData, showAddModal, plans, setShowAddModal, saveMember, editId);

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-2xl max-h-full overflow-y-auto border-2 border-warning" role="dialog" aria-modal="true" aria-labelledby="managermembersmodal-dialog-title">
        <div className="sticky top-0 px-8 py-5 border-b border-border bg-overlay flex items-center justify-between z-20">
          <h3 className="text-xl font-bold text-primary" id="managermembersmodal-dialog-title">{editId ? t("TEXT_EDIT_MEMBER") : t("TEXT_ADD_NEW_MEMBER")}</h3>
          <button data-testid="manager_members-manager-members-modal-close-1"
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-primary-subtle motion-safe:transition-all text-secondary hover:text-primary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
            aria-label={t("COPY_CLOSE_MODAL")}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <form data-testid="manager_members-managermembersmodal-form-1" onSubmit={handleSubmit} className="p-6">
          
          {/* Profile Picture Upload — extracted component (Rule 1: file size ceiling) */}
          <ManagerMembersMemberProfilePictureUpload />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            {[
              { label: t("COPY_FULL_NAME"), key: 'name', type: 'text', placeholder: t("TEXT_PLACEHOLDER_FULL_NAME"), fullWidth: true },
              { label: t("COPY_EMAIL_1"), key: 'email', type: 'email', placeholder: t("TEXT_PLACEHOLDER_EMAIL") },
              { label: t("COPY_PHONE"), key: 'phone', type: 'tel', placeholder: t("TEXT_PLACEHOLDER_PHONE") },
              { label: t("COPY_AADHAAR_NO"), key: 'aadhaar', type: 'tel', placeholder: t("TEXT_PLACEHOLDER_AADHAAR") },
              { label: t("COPY_ADDRESS_1"), key: 'address', type: 'text', placeholder: t("TEXT_PLACEHOLDER_ADDRESS"), fullWidth: true },
            ].map((f, mapIndex) => (
              <div key={f.key} className={f.fullWidth ? 'sm:col-span-2' : ''}>
                <label htmlFor="manager-managermembersmodal-field-1" className="block text-sm font-medium text-secondary mb-0.5">{f.label}</label>
                <input id="manager-managermembersmodal-field-1" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-base ${
                    errors[f.key as keyof MemberFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  }`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermembersmodal-input-primary-${mapIndex}`}
                  type={f.type}
                  placeholder={f.placeholder}
                  maxLength={(() => { if (f.key === 'aadhaar') return 12; return (() => { if (f.type === 'tel') return 10; return undefined; })(); })()}
                  onKeyDown={f.type === 'tel' ? (e) => { 
                    if (['e', 'E', '-', '+', '.'].includes(e.key)) e.preventDefault(); 
                    if (e.key.length === 1 && !/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault(); 
                  } : undefined}
                  {...register(f.key as keyof MemberFormValues)}
                  
                />
                {errors[f.key as keyof MemberFormValues] && (
                  <p className="text-danger text-xs mt-1.5">{errors[f.key as keyof MemberFormValues]?.message as string}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_GENDER_2")}</label>
              <Controller
                name="gender"
                control={useFormReturn.control}
                render={({ field }) => (
                  <ManagerSearchableDropdown ariaLabel={t("COPY_GENDER_2")} dataTestId="manager_members-managermembersmodal-managersearchabledropdown-1"
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={GENDER_OPTIONS}
                   data-testid="manager_members-managermembersmodal-searchable-dropdown-1"/>
                )}
              />
            </div>
            
            {editId && (
              <div>
                <label className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_MEMBER_STATUS")}</label>
                <Controller
                  name="status"
                  control={useFormReturn.control}
                  render={({ field }) => (
                    <ManagerSearchableDropdown ariaLabel={t("COPY_MEMBER_STATUS")} dataTestId="manager_members-managermembersmodal-managersearchabledropdown-2"
                      value={field.value || MEMBER_ACTIVE_STATUS}
                      onChange={field.onChange}
                      options={MEMBER_EDIT_STATUS_OPTIONS}
                     data-testid="manager_members-managermembersmodal-searchable-dropdown-2"/>
                  )}
                />
              </div>
            )}

            <div className={editId ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_PLAN_3")}</label>
              <Controller
                name="planId"
                control={useFormReturn.control}
                render={({ field }) => (
                  <ManagerSearchableDropdown ariaLabel={t("COPY_PLAN_3")} dataTestId="manager_members-managermembersmodal-managersearchabledropdown-3"
                    options={plans.map(p => ({ value: p.id, label: p.name }))}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t("COPY_SELECT_PLAN_2")}
                    disabled={!!editId}
                   data-testid="manager_members-managermembersmodal-searchable-dropdown-3"/>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_BILLING_CYCLE_2")}</label>
              <Controller
                name="billingCycle"
                control={useFormReturn.control}
                render={({ field }) => (
                  <ManagerSearchableDropdown ariaLabel={t("COPY_BILLING_CYCLE_2")} dataTestId="manager_members-managermembersmodal-managersearchabledropdown-4"
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={Object.entries(MEMBERS_CYCLE_LABELS).map(([val, label]) => ({ label: label as string, value: val }))}
                    disabled={!!editId}
                   data-testid="manager_members-managermembersmodal-searchable-dropdown-4"/>
                )}
              />
            </div>
            {watchBillingCycle === BILLING_CYCLE_CUSTOM && (
              <div>
                <label htmlFor="manager-managermembersmodal-field-2" className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_CUSTOM_DAYS_1")}</label>
                <input id="manager-managermembersmodal-field-2" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-base ${
                    errors.customDays ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  } ${editId ? 'border-dashed border-border' : ''}`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-members-modal-input-number-1"
                  type="number"
                  min="1"
                  max={MANAGER_MEMBER_MAX_CUSTOM_DAYS}
                  step="1"
                  readOnly={!!editId}
                  onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                  {...register('customDays')}
                  placeholder={t("COPY_E_G_15")} aria-invalid={errors.customDays ? 'true' : undefined} aria-describedby={errors.customDays ? 'managermembersmodal-customDays-error' : undefined} />
                {errors.customDays && (
                  <p className="text-danger text-xs mt-0.5">{errors.customDays?.message as string}</p>
                )}
              </div>
            )}

            {watchPlanId && (
              <div data-testid="manager_members-manager-members-modal-status" className="sm:col-span-2 bg-warning-bg rounded-xl p-4 text-sm border border-warning flex justify-between items-center">
                <div>
                  <span className="font-semibold text-warning">{t("COPY_CALCULATED_PRICE")}</span>
                  <span className="text-warning ml-1 font-bold">
                    {ManagerMembersFormatCurrency(getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0), ManagerEnvConfig.currencyCode, locale)}
                  </span>
                </div>
                {watchBillingCycle === BILLING_CYCLE_CUSTOM && (
                  <div className="text-warning text-xs opacity-80">{t("COPY_PER_DAY")}{ManagerMembersFormatCurrency(selectedPlan?.priceCustom || 0, ManagerEnvConfig.currencyCode, locale)} × {watchCustomDays || 0}{t("COPY_DAYS_2")}</div>
                )}
              </div>
            )}

            <div>
              <label htmlFor="manager-managermembersmodal-field-3" className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_JOIN_DATE_1")}</label>
              <input id="manager-managermembersmodal-field-3" data-testid="manager_members-manager-members-modal-input-date-1"
                type="date"
                readOnly={!!editId}
                {...register('joinDate')}
                className={`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-base ${editId ? 'border-dashed border-border' : ''}`}
              />
            </div>
            <div>
              <label htmlFor="manager-managermembersmodal-field-4" className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_EXPIRY_DATE_4")}</label>
              <input id="manager-managermembersmodal-field-4" data-testid="manager_members-manager-members-modal-input-date-2"
                type="date"
                readOnly
                {...register('expiryDate')}
                className="w-full border border-dashed rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input text-primary motion-safe:transition-all motion-safe:duration-base cursor-default"
              />
            </div>

            <div>
              <label htmlFor="manager-managermembersmodal-field-5" className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_TOTAL_PLAN_AMOUNT_2")}{ManagerMembersFormatCurrency(0, ManagerEnvConfig.currencyCode, locale).replace(/0/g, '').trim()})</label>
              <input id="manager-managermembersmodal-field-5" data-testid="manager_members-manager-members-modal-input-number-2"
                type="number"
                min="0"
                max={MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS}
                step="0.01"
                readOnly
                {...register('totalAmount', { valueAsNumber: true })}
                className="w-full border border-dashed border-border rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input text-primary motion-safe:transition-all motion-safe:duration-base cursor-default"
              />
            </div>
            <div>
              <label htmlFor="manager-managermembersmodal-field-6" className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_AMOUNT_PAID_2")}{ManagerMembersFormatCurrency(0, ManagerEnvConfig.currencyCode, locale).replace(/0/g, '').trim()})</label>
              <input id="manager-managermembersmodal-field-6" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-base ${editId ? 'border-dashed border-border' : ''}`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-members-modal-input-number-3"
                type="number"
                min="0"
                max={MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS}
                step="0.01"
                readOnly={!!editId}
                onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                {...register('paidAmount', { valueAsNumber: true })}
                
              />
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="manager-managermembersmodal-field-7" className="block text-sm font-medium text-secondary mb-0.5">{t("COPY_MEDICAL_HISTORY_NOTES_OPTIONAL")}</label>
              <textarea id="manager-managermembersmodal-field-7" data-testid="manager_members-manager-members-modal-textarea-message-input"
                rows={2}
                placeholder={t("COPY_E_G_ASTHMA_KNEE_INJURY_HIGH_BP")}
                {...register('medicalHistory')}
                className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-primary motion-safe:transition-all motion-safe:duration-base border-border focus-visible:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
            <button data-testid="manager_members-manager-members-modal-close-2"
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-border text-secondary hover:bg-primary-subtle hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
            >{t("COPY_CANCEL_3")}</button>
            <button data-testid="manager_members-manager-members-modal-button-submit"
              type="submit"
              disabled={isSubmitting}
              className="min-w-32 px-8 py-2.5 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all hover:shadow-card hover:shadow-card motion-safe:active:scale-95 bg-primary motion-safe:duration-base ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
            >
              {(() => { if (isSubmitting) { return (
                <Loader2 size={18} strokeWidth={2} className="text-on-primary motion-safe:animate-spin" />
              ); } return (
                <><Save size={18} strokeWidth={2}/> {editId ? t("TEXT_UPDATE_MEMBER") : t("TEXT_ADD_MEMBER")}</>
              ); })()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
