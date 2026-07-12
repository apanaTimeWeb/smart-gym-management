"use client";

import { useState, useEffect } from 'react';
import { useFinanceContext } from '@/app/erp/finance/finance_context/FinanceContext';
import { FINANCE_PAYMENT_METHODS, AddPaymentSchema, type AddPaymentFormValues, EMPTY_PAYMENT_FORM } from '@/app/erp/finance/finance_utils/FinanceSharedConstants';
import { X, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';

export default function AddPaymentModal() {
  const { showModal, setShowModal, savePayment, loading } = useFinanceContext();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<AddPaymentFormValues>({
    resolver: zodResolver(AddPaymentSchema),
    defaultValues: EMPTY_PAYMENT_FORM
  });

  useEffect(() => {
    if (showModal) {
      reset(EMPTY_PAYMENT_FORM);
    }
  }, [showModal, reset]);

  if (!showModal) return null;

  const handleAddPayment = async (data: AddPaymentFormValues) => {
    await savePayment(data);
    reset(EMPTY_PAYMENT_FORM);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 finance-module" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="rounded-2xl shadow-xl w-full max-w-md" style={{ backgroundColor: 'var(--finance-bg-card)' }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--finance-border)' }}>
          <h3 className="text-lg font-bold" style={{ color: 'var(--finance-text-primary)' }}>Record Payment</h3>
          <button 
            type="button"
            onClick={() => setShowModal(false)} 
            className="p-2 rounded-lg transition-colors hover:bg-[var(--primary-subtle)]"
            style={{ color: 'var(--finance-text-secondary)' }}
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleAddPayment)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--finance-text-secondary)' }}>Member ID</label>
            <input 
              type="number" 
              placeholder="Enter Member ID" 
              {...register('memberId')}
              className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--finance-highlight)]" 
              style={{ backgroundColor: 'var(--finance-bg-input)', borderColor: errors.memberId ? 'var(--danger)' : 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
            />
            {errors.memberId && <p className="text-[var(--danger)] text-xs mt-1">{errors.memberId.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--finance-text-secondary)' }}>Amount (₹)</label>
            <input 
              type="number" 
              placeholder="2500" 
              {...register('amount')}
              className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--finance-highlight)]" 
              style={{ backgroundColor: 'var(--finance-bg-input)', borderColor: errors.amount ? 'var(--danger)' : 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
            />
            {errors.amount && <p className="text-[var(--danger)] text-xs mt-1">{errors.amount.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--finance-text-secondary)' }}>Payment Method</label>
            <Controller
              name="method"
              control={control}
              render={({ field }) => (
                <SearchableDropdown
                  options={FINANCE_PAYMENT_METHODS.map(m => ({ label: m, value: m }))}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Method..."
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--finance-text-secondary)' }}>Notes (optional)</label>
            <input 
              type="text" 
              placeholder="Any notes..." 
              {...register('notes')}
              className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--finance-highlight)]" 
              style={{ backgroundColor: 'var(--finance-bg-input)', borderColor: 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setShowModal(false)} 
              className="flex-1 py-2.5 border rounded-xl text-sm font-medium transition-colors hover:bg-[var(--primary-subtle)]"
              style={{ borderColor: 'var(--finance-border)', color: 'var(--finance-text-primary)' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity" 
              style={{ backgroundColor: 'var(--finance-highlight)' }}
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} /> Record Payment</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
