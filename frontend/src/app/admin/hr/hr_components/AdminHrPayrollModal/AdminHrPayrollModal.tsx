"use client";
// RESPONSIBILITY: Form modal for creating a new payroll entry for a staff member in the HR module.

import { useAdminHrPayrollModalForm } from '@/app/admin/hr/hr_components/AdminHrPayrollModal/useAdminHrPayrollModalForm';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { X, Check } from 'lucide-react';
import { Controller } from 'react-hook-form';

export default function AdminHrPayrollModal() {
  const { showPayrollModal, savePayroll, saving, staff, calculationInfo, register, handleSubmit, control, errors, handleClose } = useAdminHrPayrollModalForm();

  if (!showPayrollModal) return null;


  return (
    <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay">
      <div className="w-full max-w-md rounded-2xl shadow-dialog flex flex-col max-h-screen bg-card border-2 border-warning">
        
        <div className="flex items-center justify-between px-8 py-5 border-b border-border">
          <h2 className="text-xl font-bold text-primary">
            Disburse Payroll
          </h2>
          <button onClick={() => void handleClose()} className="p-2 rounded-full hover:bg-primary-subtle motion-safe:transition-colors text-secondary hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <form id="payroll-form" onSubmit={handleSubmit((data) => savePayroll({ ...data, staffId: data.staffId }))} className="space-y-6">
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-secondary">Staff Member <span className="text-danger">*</span></label>
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
              {errors.staffId && <p className="text-danger text-xs mt-1.5">{errors.staffId.message as string}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-secondary">Month <span className="text-danger">*</span></label>
              <input 
                type="month"
                {...register('month')}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base"
              />
              {errors.month && <p className="text-danger text-xs mt-1.5">{errors.month.message as string}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-secondary">Amount (₹) <span className="text-danger">*</span></label>
              <input 
                type="number" min="0" onKeyDown={(e) => { if (['e', 'E', '-', '+'].includes(e.key)) e.preventDefault(); }}
                {...register('amount', { valueAsNumber: true })}
                readOnly
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary cursor-not-allowed opacity-80"
              />
              <p className="text-xs text-secondary mt-1.5">
                {calculationInfo ? calculationInfo : "Amount is automatically set to the staff's base salary."}
              </p>
              {errors.amount && <p className="text-danger text-xs mt-1.5">{errors.amount.message as string}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-secondary">Notes</label>
              <textarea 
                {...register('notes')}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base resize-none bg-input text-primary"
                placeholder="Optional notes..."
              />
            </div>

          </form>
        </div>

        <div className="px-8 py-5 border-t border-border flex justify-end gap-3 bg-card">
          <button 
            type="button" 
            onClick={() => void handleClose()}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-border motion-safe:transition-colors text-secondary hover:bg-surface-highlight hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="payroll-form"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-on-primary motion-safe:transition-all hover:shadow-dialog motion-safe:active:scale-95 disabled:opacity-70 bg-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            {saving ? <div className="w-4 h-4 border-2 border-border border-t-white rounded-full motion-safe:animate-spin motion-safe:duration-base" /> : <Check size={16} />}
            {saving ? 'Saving...' : 'Disburse Payroll'}
          </button>
        </div>

      </div>
    </div>
  );
}
