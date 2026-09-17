'use client';
// RESPONSIBILITY: Form modal for creating a new payroll entry for a staff member in the HR module.
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { X, Check } from 'lucide-react';
import { useHrContext } from '@/app/manager/hr/hr_context/ManagerHrContext';
import { PayrollSchema, type PayrollFormValues, EMPTY_PAYROLL_FORM } from '@/app/manager/hr/hr_utils/ManagerHrSharedConstants';
import { useManagerHrStaffAttendanceQuery } from '@/app/manager/hr/hr_api/ManagerUseManagerHrStaffAttendanceQuery';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';
import { formatCurrency } from '@/lib/formatters';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';

export default function ManagerHrPayrollModal() {
  const { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff } = useHrContext();
  const { confirm } = useConfirm();
  const [calcData, setCalcData] = React.useState<{base: number, attDed: number, advAdj: number, net: number} | null>(null);

  const { register, handleSubmit, reset, watch, setValue, control, formState: { errors, isDirty } } = useForm<PayrollFormValues>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: EMPTY_PAYROLL_FORM
  });

  useManagerUnsavedChangesGuard(isDirty && showPayrollModal);

  const selectedStaffId = watch('staffId');
  const selectedMonth = watch('month');

  useEffect(() => {
    if (showPayrollModal) {
      reset(EMPTY_PAYROLL_FORM);
      setCalcData(null);
    }
  }, [showPayrollModal, reset]);

  const { data: attendanceResponse } = useManagerHrStaffAttendanceQuery(selectedStaffId || '', selectedMonth || '');

  useEffect(() => {
    const selectedStaff = staff.find((item) => String(item.id) === String(selectedStaffId));
    if (!selectedStaff) return;

    const baseSalary = selectedStaff.salary || 0;
    let attendanceDeduction = 0;
    if (selectedMonth && attendanceResponse?.data?.history) {
      const [yearText, monthText] = selectedMonth.split('-');
      const year = Number(yearText);
      const month = Number(monthText);
      const daysInMonth = new Date(year, month, 0).getDate();
      const presentDays = attendanceResponse.data.history.filter((record) => {
        const datePrefix = `${selectedMonth}-`;
        return record.date.startsWith(datePrefix) && record.status === 'PRESENT';
      }).length;
      attendanceDeduction = Math.round((baseSalary / daysInMonth) * (daysInMonth - presentDays));
    }

    const payableBeforeAdvance = Math.max(0, baseSalary - attendanceDeduction);
    const deductedAdvance = Math.min(payableBeforeAdvance, selectedStaff.advanceSalary || 0);
    const payableAmount = Math.max(0, payableBeforeAdvance - deductedAdvance);
    setValue('amount', payableAmount);
    setValue('paidAmount', payableAmount);
    setCalcData({ base: baseSalary, attDed: attendanceDeduction, advAdj: deductedAdvance, net: payableAmount });
  }, [attendanceResponse, selectedMonth, selectedStaffId, setValue, staff]);

  if (!showPayrollModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-full bg-card/95 backdrop-blur-xl border border-border motion-safe:animate-in motion-safe:zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-8 py-5 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            Disburse Payroll
          </h2>
          <button onClick={async () => { if (!isDirty || await confirm({ title: 'Discard Changes', message: 'Discard unsaved changes?', confirmText: 'Discard', type: 'warning' })) setShowPayrollModal(false); }} className="p-2 rounded-full hover:bg-primary/10 motion-safe:transition-colors text-secondary hover:text-primary">
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
                    options={staff.map(s => ({ label: `${s.name} (${s.role}) - ${formatCurrency(s.salary)}`, value: String(s.id) }))}
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
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground motion-safe:transition-all duration-200"
              />
              {errors.month && <p className="text-danger text-xs mt-1.5">{errors.month.message as string}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-secondary">Net Payable Amount (₹) <span className="text-danger">*</span></label>
              <input 
                type="number" min="0" onKeyDown={(e) => { if (['e', 'E', '-', '+'].includes(e.key)) e.preventDefault(); }}
                {...register('amount', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground motion-safe:transition-all duration-200"
              />
              
              {calcData ? (
                <div className="mt-3 p-4 rounded-xl bg-primary/5 border border-border space-y-2">
                  <div className="flex justify-between text-xs text-secondary">
                    <span>Base Salary</span>
                    <span className="font-medium text-foreground">{formatCurrency(calcData.base)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-danger">
                    <span>Attendance Ded.</span>
                    <span>-{formatCurrency(calcData.attDed)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-warning">
                    <span>Advance Adj.</span>
                    <span>-{formatCurrency(calcData.advAdj)}</span>
                  </div>
                  <div className="pt-2 border-t border-border flex justify-between text-sm font-bold text-primary">
                    <span>Net Auto-Calculated</span>
                    <span>{formatCurrency(calcData.net)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-secondary mt-1.5">
                  Amount is automatically calculated when staff and month are selected.
                </p>
              )}
              
              {errors.amount && <p className="text-danger text-xs mt-1.5">{errors.amount.message as string}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-secondary">Amount Paying Now (₹) <span className="text-danger">*</span></label>
              <input 
                type="number" min="0" onKeyDown={(e) => { if (['e', 'E', '-', '+'].includes(e.key)) e.preventDefault(); }}
                {...register('paidAmount', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground motion-safe:transition-all duration-200"
              />
              <p className="text-xs text-secondary mt-1.5">
                Set to 0 if you are only recording the payroll and paying later.
              </p>
              {errors.paidAmount && <p className="text-danger text-xs mt-1.5">{errors.paidAmount.message as string}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-secondary">Notes</label>
              <textarea 
                {...register('notes')}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all duration-200 resize-none bg-input text-foreground"
                placeholder="Optional notes..."
              />
            </div>

          </form>
        </div>

        <div className="px-8 py-5 border-t border-border flex justify-end gap-3 bg-primary/5">
          <button 
            type="button" 
            onClick={async () => { if (!isDirty || await confirm({ title: 'Discard Changes', message: 'Discard unsaved changes?', confirmText: 'Discard', type: 'warning' })) setShowPayrollModal(false); }}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-border motion-safe:transition-colors text-secondary hover:bg-primary/5 hover:text-foreground"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="payroll-form"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-primary-foreground motion-safe:transition-all hover:scale-105 active:scale-95 shadow-lg disabled:opacity-70 disabled:hover:scale-100 bg-primary"
          >
            {saving ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full motion-safe:animate-spin" /> : <Check size={16} />}
            {saving ? 'Saving...' : 'Disburse Payroll'}
          </button>
        </div>

      </div>
    </div>
  );
}
