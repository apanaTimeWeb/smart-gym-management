'use client';
/**
 * RESPONSIBILITY: React component SuperadminCouponsCouponModal owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsCouponModalTypes, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDateUtils
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Create Coupon modal form. Receives form state via props from useCouponsPage. No API calls.
import React from 'react';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';
import { getSuperadminCouponsTodayISODate } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDateUtils';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { SuperadminCouponsCouponModalProps } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsCouponModalTypes';


/** @description Renders the create/edit coupon modal shell and field composition. @dependencies Consumes React Hook Form state and the owning module submit callback. @edge-case Does not reset or close until the owning mutation reports success. */
export const SuperadminCouponsCouponModal: React.FC<SuperadminCouponsCouponModalProps> = ({ isOpen, onClose, form, onSubmit, }) => {
  const t = useTranslations('superadmin_coupons');
    const todayIsoDate = getSuperadminCouponsTodayISODate();
    useSuperadminLayoutUnsavedChangesGuard(isOpen && form.formState.isDirty);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="superadmin_coupons-coupon-modal-dialog">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-md shadow-dialog overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <h2 className="text-lg font-bold text-primary">{t('ui.create_global_coupon_53ce473c')}</h2>
          <button onClick={onClose} className="text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-button">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 modal-scroll-area" data-testid="superadmin_coupons-superadmincouponscouponmodal-form-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">{t('ui.coupon_code_9d463ea3')}<span className="text-disabled font-normal ml-1">{t('ui.optional_d9e6f344')}</span></label>
            <input {...form.register('code', {
        onChange: (e) => {
            e.target.value = e.target.value.toUpperCase();
        }
    })} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary font-mono uppercase focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.leave_blank_to_auto_generate_36c44533')} data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-input"/>
            {form.formState.errors.code && <span className="text-xs text-danger">{form.formState.errors.code.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">{t('ui.discount_type_f908785b')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <Controller name="discountType" control={form.control} render={({ field }) => (<SearchableDropdown value={field.value || ''} onChange={field.onChange} options={SUPERADMIN_COUPON_DISCOUNT_TYPE_OPTIONS.map((option) => ({ label: option.label, value: option.value }))} data-testid="superadmin_coupons-coupon-modal-discount-type"/>)} data-testid="superadmin_coupons-coupon-modal-discount-type-field"/>
              {form.formState.errors.discountType && <span className="text-xs text-danger">{form.formState.errors.discountType.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">
                {form.watch('discountType') === 'PERCENTAGE' ? t('ui.discount_percent_3a7d1c2e') : t('ui.discount_amount_5b9e2d4f')} <span className="text-danger">{t('ui.text_3389dae3')}</span>
              </label>
              <div className="relative">
                {form.watch('discountType') === 'EXACT' && (<span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-sm font-semibold">{t('ui.rs_af69e868')}</span>)}
                <input type="number" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
        e.preventDefault(); }} min="0.01" step={form.watch('discountType') === 'PERCENTAGE' ? 1 : 0.01} max={form.watch('discountType') === 'PERCENTAGE' ? 100 : undefined} {...form.register('discountValue', { valueAsNumber: true })} className={`w-full ${form.watch('discountType') === 'EXACT' ? 'pl-9 pr-4' : 'px-4'} py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors`} placeholder={form.watch('discountType') === 'PERCENTAGE' ? '25' : '500'} data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-number"/>
              </div>
              {form.formState.errors.discountValue && <span className="text-xs text-danger">{form.formState.errors.discountValue.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">{t('ui.max_uses_eed40cb4')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input type="number" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
        e.preventDefault(); }} min="1" step="1" {...form.register('maxUses', { valueAsNumber: true })} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.100_f899139d')} data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-coupon-modal-number-2"/>
              {form.formState.errors.maxUses && <span className="text-xs text-danger">{form.formState.errors.maxUses.message}</span>}
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-secondary">{t('ui.expiry_date_5abc7a3a')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input type="date" min={todayIsoDate} {...form.register('expiryDate')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-date"/>
              {form.formState.errors.expiryDate && <span className="text-xs text-danger">{form.formState.errors.expiryDate.message}</span>}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-surface-highlight text-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-superadmin-coupon-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-coupon-modal-coupon-modal-create-coupon">
              {t('ui.create_coupon_90e43665')}</button>
          </div>
        </form>
      </div>
    </div>);
};
