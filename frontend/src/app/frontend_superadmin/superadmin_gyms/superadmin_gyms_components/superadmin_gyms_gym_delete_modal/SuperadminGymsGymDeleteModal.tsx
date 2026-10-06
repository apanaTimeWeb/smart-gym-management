// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymDeleteModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDeleteModal owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDeleteModal
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the confirmation modal for deleting a gym. Requires the user to type "DELETE".
import React from 'react';

import { AlertTriangle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useSuperadminGymsGymDeleteModal } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDeleteModal';


/**
 * @description Renders the confirmation modal for deleting a gym. Requires the user to type "DELETE".
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsGymDeleteModal() {
  const t = useTranslations('superadmin_gyms');
    const { isDeleteModalOpen, closeDeleteModal, gymToDelete, confirmText, setConfirmText, handleConfirmDelete, actionLoadingId } = useSuperadminGymsGymDeleteModal();
    if (!isDeleteModalOpen || !gymToDelete)
        return null;
    const isDeleteEnabled = confirmText === 'DELETE' && actionLoadingId !== gymToDelete.id;
    const isDeleting = actionLoadingId === gymToDelete.id;
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4" role="dialog" aria-modal="true" data-testid="superadmin_gyms-gym-delete-modal-dialog">
      <div className="bg-overlay rounded-xl p-7 max-w-md w-full border border-border shadow-dialog relative">
        <button onClick={closeDeleteModal} className="absolute top-5 right-5 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isDeleting} data-testid="superadmin_gyms-superadmin-gyms-gym-delete-modal-gym-delete-modal-button">
          <X size={18}/>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-danger-bg p-2 rounded-full">
            <AlertTriangle size={18} className="text-danger"/>
          </div>
          <h2 className="text-lg font-bold text-primary">{t('ui.delete_gym_326630c6')}</h2>
        </div>
        
        <p className="text-sm text-secondary mb-4">
          {t('ui.you_are_about_to_permanently_delete_44bf7cd2')}<strong>{gymToDelete.name}</strong> {t('ui.and_all_associated_data_this_action_cannot_b_f581a485')}</p>

        <div className="bg-danger-bg border border-border rounded-lg p-4 mb-6">
          <label className="block text-sm font-bold text-secondary mb-2">
            {t('ui.please_type_1aeee9f4')}<span className="text-primary font-mono select-none">{t('ui.delete_32f68a60')}</span> {t('ui.to_confirm_c55cced3')}</label>
          <input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-border focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" placeholder={t('ui.type_delete_013033d8')} disabled={isDeleting} data-testid="superadmin_gyms-superadmin-gyms-gym-delete-modal-gym-delete-modal-text"/>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={closeDeleteModal} className="px-5 py-2.5 rounded-lg text-sm font-medium text-primary border border-border hover:bg-page motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isDeleting} data-testid="superadmin_gyms-superadmin-gyms-gym-delete-modal-gym-delete-modal-cancel">
            {t('ui.cancel_ea478870')}</button>
          <button type="button" onClick={handleConfirmDelete} className="px-5 py-2.5 rounded-lg text-sm font-medium text-on-danger bg-danger hover:bg-danger-bg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={!isDeleteEnabled} data-testid="superadmin_gyms-gym-delete-modal-confirm-delete">
            {isDeleting ? t('ui.deleting_2b7e1c4d') : t('ui.confirm_delete_9a1d5c7e')}
          </button>
        </div>
      </div>
    </div>);
}
