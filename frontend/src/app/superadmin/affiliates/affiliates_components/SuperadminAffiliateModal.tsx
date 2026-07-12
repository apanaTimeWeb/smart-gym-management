import React from 'react';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { AffiliateFormData } from '../../superadmin_utils/SuperadminZodSchemas';

interface SuperadminAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<AffiliateFormData>;
  onSubmit: (data: AffiliateFormData) => void;
  isEdit?: boolean;
}

export const SuperadminAffiliateModal: React.FC<SuperadminAffiliateModalProps> = ({
  isOpen,
  onClose,
  form,
  onSubmit,
  isEdit = false,
}) => {
  if (!isOpen) return null;

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl w-full max-w-[480px] shadow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--text-primary)]">
            {isEdit ? 'Edit Affiliate Partner' : 'Add Affiliate Partner'}
          </h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[var(--text-secondary)]">Partner Name <span className="text-[var(--danger)]">*</span></label>
            <input 
              {...register('name')}
              className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
              placeholder="e.g. Fitness Gurus LLC"
            />
            {errors.name && <span className="text-[12px] text-[var(--danger)]">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[var(--text-secondary)]">Email Address <span className="text-[var(--danger)]">*</span></label>
            <input 
              type="email" 
              {...register('email')}
              className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
              placeholder="partner@example.com"
            />
            {errors.email && <span className="text-[12px] text-[var(--danger)]">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[var(--text-secondary)]">Custom Referral Code <span className="text-[var(--danger)]">*</span></label>
            <input 
              {...register('referralCode')}
              className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] font-mono uppercase focus:outline-none focus:border-[var(--border-focus)] transition-colors"
              placeholder="e.g. PARTNER2026"
            />
            {errors.referralCode && <span className="text-[12px] text-[var(--danger)]">{errors.referralCode.message}</span>}
            <p className="text-[12px] text-[var(--text-secondary)]">Gyms using this code at checkout will be tracked to this partner.</p>
          </div>

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-[var(--border)]">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 bg-transparent border border-[var(--border)] hover:bg-[var(--border)] text-[var(--text-primary)] font-medium rounded-lg transition-colors text-[14px]"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors text-[14px]"
            >
              {isEdit ? 'Save Changes' : 'Save Partner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
