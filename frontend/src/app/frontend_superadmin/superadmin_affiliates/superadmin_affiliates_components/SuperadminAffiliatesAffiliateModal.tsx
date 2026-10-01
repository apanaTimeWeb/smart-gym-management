'use client';
// RESPONSIBILITY: Renders the Create/Edit Affiliate modal form. Receives form state via props from useSuperadminAffiliatesPage. No API calls.
import { useTranslations } from 'next-intl';
import React from 'react';

import { X } from 'lucide-react';

import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { useSuperadminLayoutDialogA11y } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y';

import type { SuperadminAffiliateModalProps } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesAffiliateModalTypes';
import type { AffiliateFormData } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';
import type { UseFormReturn } from 'react-hook-form';

/**
 * @description Renders the Create/Edit Affiliate modal form. Receives form state via props and delegates validation/submission to the owning page flow.
 * @dependencies Consumes only owning feature props, form contracts, and approved global UI primitives.
 * @edge-case Preserves disabled, validation-error, cancel, retry, and repeated-submit safeguards.
 */
export const SuperadminAffiliatesAffiliateModal: React.FC<SuperadminAffiliateModalProps> = ({ isOpen, onClose, form, onSubmit, isEdit = false, isMutating = false, }) => {
  const t = useTranslations('superadmin_affiliates');
    const { register, handleSubmit, formState: { errors, isDirty } } = form;
    useUnsavedChangesGuard(isOpen && isDirty && !isMutating, t('ui.unsaved_affiliate_changes'));
    const dialogRef = useSuperadminLayoutDialogA11y(isOpen, onClose);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-affiliate-modal-title" data-testid="superadmin_affiliates-affiliates-affiliate-modal-dialog" ref={dialogRef}>
      <div className="bg-overlay border border-border rounded-xl w-full max-w-md shadow-dialog overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <h2 id="superadmin-affiliate-modal-title" className="text-lg font-bold text-primary">
            {isEdit ? t('ui.edit_affiliate_partner_9e771fe') : t('ui.add_affiliate_partner_4c94707')}
          </h2>
          <button type="button" onClick={onClose} aria-label={t('ui.close_dialog')} className="min-h-11 min-w-11 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_affiliates-affiliates-affiliate-modal-action1">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 modal-scroll-area" data-testid="superadmin_affiliates-superadminaffiliatemodal-form-submit">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="superadmin-affiliate-name" className="text-sm font-bold text-secondary">{t('ui.partner_name_d78e689')} <span className="text-danger">*</span></label>
            <input id="superadmin-affiliate-name" {...register('name')} className="min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.e_g_fitness_gurus_llc_72bb9f6')} data-testid="superadmin_affiliates-affiliates-affiliate-modal-control"/>
            {errors.name && <span className="text-xs text-danger">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="superadmin-affiliate-email" className="text-sm font-bold text-secondary">{t('ui.email_address_07a7614')} <span className="text-danger">*</span></label>
            <input id="superadmin-affiliate-email" type="email" {...register('email')} className="min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.partner_example_com_7901a9c')} data-testid="superadmin_affiliates-affiliates-affiliate-modal-control-2"/>
            {errors.email && <span className="text-xs text-danger">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="superadmin-affiliate-referral-code" className="text-sm font-bold text-secondary">{t('ui.custom_referral_code_bc8f181')} <span className="text-danger">*</span></label>
            <input id="superadmin-affiliate-referral-code" {...register('referralCode')} className="min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary font-mono uppercase focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.e_g_partner2026_19b351b')} data-testid="superadmin_affiliates-affiliates-affiliate-modal-control-3"/>
            {errors.referralCode && <span className="text-xs text-danger">{errors.referralCode.message}</span>}
            <p className="text-xs text-secondary">{t('ui.gyms_using_this_code_at_checkout_will_be_tracked_b3e726e')}</p>
          </div>

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-border">
            <button type="button" onClick={onClose} className="min-h-11 px-5 py-2.5 bg-transparent border border-border hover:bg-surface-hover text-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_affiliates-affiliates-affiliate-modal-cancel">
              
              {t('ui.cancel_1821b90')}
            </button>
            <button type="submit" disabled={isMutating} className="min-h-11 min-w-36 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_affiliates-affiliates-affiliate-modal-action3">
              {isMutating ? t('ui.saving') : (isEdit ? t('ui.save_changes_8cb69e1') : t('ui.save_partner_1fb36ea'))}
            </button>
          </div>
        </form>
      </div>
    </div>);
};
