// RESPONSIBILITY: Form modal for creating a new payroll entry for a staff member in the HR module.
'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { X, Check } from 'lucide-react';
import { useHrContext } from '@/app/manager/hr/hr_context/HrContext';
import { PayrollSchema, type PayrollFormValues, EMPTY_PAYROLL_FORM } from '@/app/manager/hr/hr_utils/HrSharedConstants';

export default function PayrollModal() {
  const { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff } = useHrContext();

  const { register, handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm<PayrollFormValues>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: EMPTY_PAYROLL_FORM
  });

  const selectedStaffId = watch('staffId');

  useEffect(() => {
    if (showPayrollModal) reset(EMPTY_PAYROLL_FORM);
  }, [showPayrollModal, reset]);

  useEffect(() => {
    if (selectedStaffId) {
      const s = staff.find(x => String(x.id) === String(selectedStaffId));
      if (s) {
        setValue('amount', s.salary || 0);
      }
    }
  }, [selectedStaffId, staff, setValue]);

  if (!showPayrollModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-md rounded-2xl shadow-xl flex flex-col max-h-[90vh] bg-card border border-border">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            Disburse Payroll
          </h2>
          <button onClick={() => setShowPayrollModal(false)} className="p-2 rounded-full hover:bg-[rgba(99,102,241,0.1)] transition-colors text-secondary hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="payroll-form" onSubmit={handleSubmit((data) => savePayroll({ ...data, staffId: data.staffId }))} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Staff Member <span className="text-danger">*</span></label>
              <Controller
                name="staffId"
                control={control}
                render={({ field }) => (
                  <SearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder="Select Staff"
                    options={staff.map(s => ({ label: `${s.name} (${s.role}) - ₹${s.salary}`, value: String(s.id) }))}
                  />
                )}
              />
              {errors.staffId && <p className="text-danger text-xs mt-1">{errors.staffId.message as string}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Month <span className="text-danger">*</span></label>
              <input 
                type="text"
                {...register('month')}
                className="w-full px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground"
                placeholder="e.g. Jan 2024"
              />
              {errors.month && <p className="text-danger text-xs mt-1">{errors.month.message as string}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Amount (₹) <span className="text-danger">*</span></label>
              <input 
                type="number"
                {...register('amount', { valueAsNumber: true })}
                readOnly
                className="w-full px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground cursor-not-allowed opacity-80"
              />
              <p className="text-xs text-secondary mt-1">Amount is automatically set to the staff's base salary.</p>
              {errors.amount && <p className="text-danger text-xs mt-1">{errors.amount.message as string}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Notes</label>
              <textarea 
                {...register('notes')}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus-visible:ring-2 focus-visible:ring-primary focus:outline-none transition-all resize-none bg-input text-foreground"
                placeholder="Optional notes..."
              />
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-border flex justify-end gap-3 bg-card/50">
          <button 
            type="button" 
            onClick={() => setShowPayrollModal(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-foreground hover:bg-secondary/10"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="payroll-form"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 bg-primary"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={16} />}
            {saving ? 'Saving...' : 'Disburse Payroll'}
          </button>
        </div>

      </div>
    </div>
  );
}
