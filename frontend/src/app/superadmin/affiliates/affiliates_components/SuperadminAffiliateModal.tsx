// RESPONSIBILITY: Renders the Create/Edit Affiliate modal form. Receives form state via props from useSuperadminAffiliatesPage. No API calls.
'use client';
import React from 'react';
import { X } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { AffiliateFormData } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
import type { SuperadminAffiliateModalProps } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliateModalTypes';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
export const SuperadminAffiliateModal: React.FC<SuperadminAffiliateModalProps> = ({ isOpen, onClose, form, onSubmit, isEdit = false, isMutating = false, }) => {
    const { register, handleSubmit, formState: { errors, isDirty } } = form;
    useUnsavedChangesGuard(isOpen && isDirty);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-overlay border border-border rounded-2xl w-full max-w-md shadow-dialog overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <h2 className="text-lg font-bold text-primary">
            {isEdit ? 'Edit Affiliate Partner' : 'Add Affiliate Partner'}
          </h2>
          <button onClick={onClose} className="text-secondary hover:text-primary motion-safe:transition-colors">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 modal-scroll-area">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">Partner Name <span className="text-danger">*</span></label>
            <input {...register('name')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="e.g. Fitness Gurus LLC"/>
            {errors.name && <span className="text-xs text-danger">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">Email Address <span className="text-danger">*</span></label>
            <input type="email" {...register('email')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="partner@example.com"/>
            {errors.email && <span className="text-xs text-danger">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-secondary">Custom Referral Code <span className="text-danger">*</span></label>
            <input {...register('referralCode')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary font-mono uppercase focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors" placeholder="e.g. PARTNER2026"/>
            {errors.referralCode && <span className="text-xs text-danger">{errors.referralCode.message}</span>}
            <p className="text-xs text-secondary">Gyms using this code at checkout will be tracked to this partner.</p>
          </div>

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-border text-primary font-medium rounded-lg motion-safe:transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={isMutating} className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {isMutating ? 'Saving...' : (isEdit ? 'Save Changes' : 'Save Partner')}
            </button>
          </div>
        </form>
      </div>
    </div>);
};
