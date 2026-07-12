import React from 'react';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CouponFormData } from '../../superadmin_utils/SuperadminZodSchemas';

interface SuperadminCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<CouponFormData>;
  onSubmit: (data: CouponFormData) => void;
}

export const SuperadminCouponModal: React.FC<SuperadminCouponModalProps> = ({
  isOpen,
  onClose,
  form,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl w-full max-w-[480px] shadow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--text-primary)]">Create Global Coupon</h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-7 gap-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[var(--text-secondary)]">Coupon Code <span className="text-[var(--text-disabled)] font-normal ml-1">(Optional)</span></label>
            <input 
              {...form.register('code')}
              className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] font-mono uppercase focus:outline-none focus:border-[var(--border-focus)] transition-colors"
              placeholder="Leave blank to auto-generate"
            />
            {form.formState.errors.code && <span className="text-[12px] text-[var(--danger)]">{form.formState.errors.code.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-bold text-[var(--text-secondary)]">Discount Type <span className="text-[var(--danger)]">*</span></label>
              <select
                {...form.register('discountType')}
                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors appearance-none"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="EXACT">Exact Amount (Rs)</option>
              </select>
              {form.formState.errors.discountType && <span className="text-[12px] text-[var(--danger)]">{form.formState.errors.discountType.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-bold text-[var(--text-secondary)]">
                {form.watch('discountType') === 'PERCENTAGE' ? 'Discount %' : 'Discount Amount'} <span className="text-[var(--danger)]">*</span>
              </label>
              <div className="relative">
                {form.watch('discountType') === 'EXACT' && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-[14px] font-semibold">Rs</span>
                )}
                <input 
                  type="number" 
                  {...form.register('discountValue', { valueAsNumber: true })}
                  className={`w-full ${form.watch('discountType') === 'EXACT' ? 'pl-9 pr-4' : 'px-4'} py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors`}
                  placeholder={form.watch('discountType') === 'PERCENTAGE' ? '25' : '500'}
                />
              </div>
              {form.formState.errors.discountValue && <span className="text-[12px] text-[var(--danger)]">{form.formState.errors.discountValue.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-bold text-[var(--text-secondary)]">Max Uses <span className="text-[var(--danger)]">*</span></label>
              <input 
                type="number" 
                {...form.register('maxUses', { valueAsNumber: true })}
                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                placeholder="100"
              />
              {form.formState.errors.maxUses && <span className="text-[12px] text-[var(--danger)]">{form.formState.errors.maxUses.message}</span>}
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-bold text-[var(--text-secondary)]">Expiry Date <span className="text-[var(--danger)]">*</span></label>
              <input 
                type="date" 
                {...form.register('expiryDate')}
                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
              />
              {form.formState.errors.expiryDate && <span className="text-[12px] text-[var(--danger)]">{form.formState.errors.expiryDate.message}</span>}
            </div>
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
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
