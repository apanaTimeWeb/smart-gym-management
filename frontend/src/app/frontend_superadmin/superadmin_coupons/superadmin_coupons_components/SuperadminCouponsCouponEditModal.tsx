'use client';
/**
 * RESPONSIBILITY: React component SuperadminCouponsCouponEditModal owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useEffect, useForm
 * MODULE DEPENDENCIES: lucide-react, @hookform/resolvers/zod, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsCouponEditModalTypes, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Edit Coupon modal form. Manages its own local form state via React Hook Form. No API calls — delegates save to onSubmit prop.
import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';
import { CouponSchema } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_schemas/SuperadminCouponsContractSchemas';
import { formatSuperadminCouponDateForInput } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDateUtils';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { SuperadminCouponsCouponEditModalProps } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsCouponEditModalTypes';
import type { CouponFormData, Coupon } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';


/** @description Renders the coupon edit form modal; submission is delegated to the provided form handler. @dependencies Receives validated form state and mutation status through props. @edge-case Keeps entered values intact when submission fails and disables duplicate submission while pending. */
export const SuperadminCouponsCouponEditModal: React.FC<SuperadminCouponsCouponEditModalProps> = ({ isOpen, onClose, onSubmit, coupon, }) => {
  const t = useTranslations('superadmin_coupons');
    const { register, handleSubmit, watch, control, formState: { errors, isDirty }, reset } = useForm<CouponFormData>({
        resolver: zodResolver(CouponSchema),
    });
    useSuperadminLayoutUnsavedChangesGuard(isOpen && isDirty);
    // RESPONSIBILITY: Handle side-effects for SuperadminCouponsCouponEditModal
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize the editable form with the selected record when the modal opens, then let cleanup be handled by React Hook Form.
    useEffect(() => {
        if (isOpen && coupon) {
            reset({
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                maxUses: coupon.maxUses,
                expiryDate: formatSuperadminCouponDateForInput(coupon.expiryDate),
            });
        }
    }, [isOpen, coupon, reset]);
    if (!isOpen || !coupon)
        return null;
    const handleFormSubmit = (data: CouponFormData) => {
        if (coupon) {
            onSubmit(coupon.id, data);
        }
    };
    return (<div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="superadmin_coupons-coupon-edit-modal-dialog">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-md shadow-dialog overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <h2 className="text-lg font-bold text-primary">{t('ui.edit_coupon_5a092977')}</h2>
          <button onClick={onClose} className="text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-button">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col p-7 gap-5 modal-scroll-area" data-testid="superadmin_coupons-superadmincouponscouponeditmodal-form-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">{t('ui.coupon_code_9d463ea3')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input {...register('code')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary font-mono uppercase focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.e_g_summer2026_47f2cf40')} data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-input"/>
            {errors.code && <span className="text-xs text-danger">{errors.code.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">{t('ui.discount_type_f908785b')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <Controller name="discountType" control={control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} options={SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS.map((option) => ({ label: option.label, value: option.value }))} data-testid="superadmin_coupons-coupon-edit-modal-discount-type"/>)} data-testid="superadmin_coupons-coupon-edit-modal-discount-type-field"/>
              {errors.discountType && <span className="text-xs text-danger">{errors.discountType.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">
                {watch('discountType') === 'PERCENTAGE' ? t('ui.discount_percent_3a7d1c2e') : t('ui.discount_amount_5b9e2d4f')} <span className="text-danger">{t('ui.text_3389dae3')}</span>
              </label>
              <div className="relative">
                {watch('discountType') === 'EXACT' && (<span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-sm font-semibold">{t('ui.rs_af69e868')}</span>)}
                <input type="number" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
        e.preventDefault(); }} min="0.01" step={watch('discountType') === 'PERCENTAGE' ? 1 : 0.01} max={watch('discountType') === 'PERCENTAGE' ? 100 : undefined} {...register('discountValue', { valueAsNumber: true })} className={`w-full ${watch('discountType') === 'EXACT' ? 'pl-9 pr-4' : 'px-4'} py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors`} placeholder={watch('discountType') === 'PERCENTAGE' ? '25' : '500'} data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-number"/>
              </div>
              {errors.discountValue && <span className="text-xs text-danger">{errors.discountValue.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">{t('ui.max_uses_eed40cb4')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input type="number" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
        e.preventDefault(); }} min="1" step="1" {...register('maxUses', { valueAsNumber: true })} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.100_f899139d')} data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-edit-modal-number-2"/>
              {errors.maxUses && <span className="text-xs text-danger">{errors.maxUses.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">{t('ui.expiry_date_5abc7a3a')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input type="date" {...register('expiryDate')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-date"/>
            {errors.expiryDate && <span className="text-xs text-danger">{errors.expiryDate.message}</span>}
          </div>

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-surface-highlight text-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-coupon-edit-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-coupon-edit-modal-edit-modal-save-changes">
              {t('ui.save_changes_f5d6040e')}</button>
          </div>
        </form>
      </div>
    </div>);
};
