'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymWhatsappModal owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/lib/formatters, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymWhatsappModal, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the modal UI for sending a WhatsApp message to a Gym owner. Purely a view component.
import React from 'react';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { maskSensitiveData } from '@/lib/formatters';

import { useSuperadminGymsGymWhatsappModal } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymWhatsappModal';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';


/**
 * @description Renders the modal UI for sending a WhatsApp message to a Gym owner. Purely a view component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsGymWhatsappModal() {
  const t = useTranslations('superadmin_gyms');
    const { isWhatsappModalOpen, closeWhatsappModal, selectedGym, register, handleSubmit, onSubmit, errors, isSubmitting, isDirty, } = useSuperadminGymsGymWhatsappModal();
    useSuperadminLayoutUnsavedChangesGuard(isWhatsappModalOpen && isDirty);
    if (!isWhatsappModalOpen || !selectedGym)
        return null;
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4" role="dialog" aria-modal="true" data-testid="superadmin_gyms-gym-whatsapp-modal-dialog">
      <div className="bg-overlay rounded-xl p-7 max-w-md w-full border border-border shadow-dialog relative">
        <button onClick={closeWhatsappModal} className="absolute top-5 right-5 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-button">
          <X size={18}/>
        </button>

        <h2 className="text-lg font-bold text-primary mb-1">{t('ui.whatsapp_gym_owner_22a1e1c1')}</h2>
        <p className="text-sm text-secondary mb-6">{t('ui.send_a_whatsapp_message_to_06f6cf8b')}{selectedGym.ownerName} {t('ui.text_84c40473')}{maskSensitiveData(selectedGym.phone, 'phone')}{t('ui.text_ce96ce64')}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="superadmin_gyms-superadmingymsgymwhatsappmodal-form-1">
          <div>
            <label className="block text-sm font-bold text-secondary mb-1">{t('ui.subject_c7892ebb')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="text" {...register('subject')} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" placeholder={t('ui.e_g_important_update_about_your_subscription_375abb7e')} data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-text"/>
            {errors.subject && <p className="text-xs text-danger mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">{t('ui.message_4c2a8fe7')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <textarea {...register('message')} rows={5} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors resize-none" placeholder={t('ui.type_your_message_here_88512a88')} data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-textarea"/>
            {errors.message && <p className="text-xs text-danger mt-1">{errors.message.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button type="button" onClick={closeWhatsappModal} className="px-5 py-2.5 rounded-lg text-sm font-medium text-primary border border-border hover:bg-page motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isSubmitting} data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" className="px-5 py-2.5 rounded-lg text-sm font-medium text-on-success bg-success hover:bg-success-bg motion-safe:transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isSubmitting} data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-submit">
              {isSubmitting ? t('ui.sending_3d2f8a1b') : t('ui.send_whatsapp_51b7c2d3')}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
