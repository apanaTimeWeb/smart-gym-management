"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Check } from 'lucide-react';
import { useHrContext } from '@/app/erp/hr/hr_context/HrContext';
import { PayrollSchema, type PayrollFormValues, EMPTY_PAYROLL_FORM } from '@/app/erp/hr/hr_utils/HrSharedConstants';

export default function PayrollModal() {
  const { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff } = useHrContext();

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<PayrollFormValues>({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 hr-module">
      <div className="w-full max-w-md rounded-2xl shadow-xl flex flex-col max-h-[90vh]" style={{ backgroundColor: 'var(--hr-bg-card)', borderColor: 'var(--hr-border)', borderWidth: '1px' }}>
        
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--hr-border)' }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--hr-text-primary)' }}>
            Disburse Payroll
          </h2>
          <button onClick={() => setShowPayrollModal(false)} className="p-2 rounded-full hover:bg-[rgba(99,102,241,0.1)] transition-colors text-[var(--hr-text-secondary)] hover:text-[var(--hr-text-primary)]">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="payroll-form" onSubmit={handleSubmit(savePayroll)} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--hr-text-primary)' }}>Staff Member <span className="text-red-500">*</span></label>
              <select 
                {...register('staffId')}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:outline-none transition-all"
                style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
              >
                <option value="">Select Staff</option>
                {staff.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.role}) - ₹{s.salary}</option>
                ))}
              </select>
              {errors.staffId && <p className="text-red-500 text-xs mt-1">{errors.staffId.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--hr-text-primary)' }}>Month <span className="text-red-500">*</span></label>
              <input 
                type="text"
                {...register('month')}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:outline-none transition-all"
                style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
                placeholder="e.g. Jan 2024"
              />
              {errors.month && <p className="text-red-500 text-xs mt-1">{errors.month.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--hr-text-primary)' }}>Amount (₹) <span className="text-red-500">*</span></label>
              <input 
                type="number"
                {...register('amount')}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl border text-sm bg-[var(--hr-bg-main)] cursor-not-allowed opacity-80"
                style={{ borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
              />
              <p className="text-xs" style={{ color: 'var(--hr-text-secondary)' }}>Amount is automatically set to the staff's base salary.</p>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--hr-text-primary)' }}>Notes</label>
              <textarea 
                {...register('notes')}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:outline-none transition-all resize-none"
                style={{ backgroundColor: 'var(--hr-bg-input)', borderColor: 'var(--hr-border)', color: 'var(--hr-text-primary)' }}
                placeholder="Optional notes..."
              />
            </div>

          </form>
        </div>

        <div className="p-6 border-t flex justify-end gap-3" style={{ borderColor: 'var(--hr-border)', backgroundColor: 'var(--hr-bg-main)' }}>
          <button 
            type="button" 
            onClick={() => setShowPayrollModal(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ color: 'var(--hr-text-primary)', backgroundColor: 'transparent' }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="payroll-form"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: 'var(--hr-highlight)' }}
          >
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={16} />}
            {saving ? 'Saving...' : 'Disburse Payroll'}
          </button>
        </div>

      </div>
    </div>
  );
}
