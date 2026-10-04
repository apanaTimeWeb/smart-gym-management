// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymEditModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymEditModal owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsFormatCurrency, next-intl, @/components/ui/SearchableDropdown, lucide-react, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymEditModal, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the modal UI for editing Gym details. Purely a view component.
import React, { useState } from 'react';

import { X, Eye, EyeOff } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { useSuperadminGymsGymEditModal } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymEditModal';
import { formatCurrency as SuperadminGymsFormatCurrency } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsFormatCurrency';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';



/**
 * @description Owns the SuperadminGymsGymEditModal responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsGymEditModal() {
  const t = useTranslations('superadmin_gyms');
    const locale = useLocale();

    const { isEditModalOpen, closeEditModal, selectedGym, plans, loadingPlans, register, handleSubmit, onSubmit, control, errors, isDirty, isSubmitting, } = useSuperadminGymsGymEditModal();
    useSuperadminLayoutUnsavedChangesGuard(isDirty);
    const [showPassword, setShowPassword] = React.useState(false);
    if (!isEditModalOpen || !selectedGym)
        return null;
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4" role="dialog" aria-modal="true" data-testid="superadmin_gyms-gym-edit-modal-dialog">
      <div className="bg-overlay rounded-xl p-7 max-w-md w-full border border-border shadow-dialog relative">
        <button onClick={closeEditModal} className="absolute top-5 right-5 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-button">
          <X size={18}/>
        </button>

        <h2 className="text-lg font-bold text-primary mb-1">{t('ui.edit_gym_details_13d512aa')}</h2>
        <p className="text-sm text-secondary mb-6">{t('ui.update_the_information_for_527d24e4')}{selectedGym.name}{t('ui.text_5058f1af')}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="superadmin_gyms-superadmingymsgymeditmodal-form-1">
          <div>
            <label className="block text-sm font-bold text-secondary mb-1">{t('ui.gym_name_4ad76c40')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="text" {...register('name')} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-text"/>
            {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">{t('ui.owner_name_b7dbf209')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="text" {...register('ownerName')} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-edit-modal-text-2"/>
            {errors.ownerName && <p className="text-xs text-danger mt-1">{errors.ownerName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">{t('ui.admin_email_214e3596')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="email" {...register('adminEmail')} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-email"/>
            {errors.adminEmail && <p className="text-xs text-danger mt-1">{errors.adminEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">{t('ui.phone_number_1e4dbc7e')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="text" {...register('phone')} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" placeholder={t('ui.1_555_0000_3686f4d1')} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-edit-modal-text-3"/>
            {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">{t('ui.reset_password_6072e83b')}<span className="font-normal">{t('ui.optional_d9e6f344')}</span></label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} {...register('temporaryPassword')} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors pr-10" placeholder={t('ui.leave_blank_to_keep_current_3d206d04')} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-input"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.toggle_password_visibility_60e1b286')} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-modal-toggle-password-visibility">
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
            {errors.temporaryPassword && <p className="text-xs text-danger mt-1">{errors.temporaryPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">{t('ui.subscription_plan_90fe0789')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <Controller name="plan" control={control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} options={plans ? plans.map((p) => ({ label: `${p.name} (${SuperadminGymsFormatCurrency(Number(p.priceMonthly), p.currency || 'INR', locale)}/mo)`, value: p.name })) : []} disabled={loadingPlans} placeholder={loadingPlans ? t('ui.loading_plans') : t('ui.select_plan')} data-testid="superadmin_gyms-gym-edit-modal-plan-dropdown"/>)} data-testid="superadmin_gyms-gym-edit-modal-plan-field"/>
            {errors.plan && <p className="text-xs text-danger mt-1">{errors.plan.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button type="button" onClick={closeEditModal} className="px-5 py-2.5 rounded-lg text-sm font-medium text-primary border border-border hover:bg-page motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isSubmitting} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" className="px-5 py-2.5 rounded-lg text-sm font-medium text-on-primary bg-primary hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isSubmitting} data-testid="superadmin_gyms-superadmin-gyms-gym-edit-modal-gym-edit-modal-submit">
              {isSubmitting ? t('ui.saving_8e4c1a2d') : t('ui.save_changes_4c7d9b1a')}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
