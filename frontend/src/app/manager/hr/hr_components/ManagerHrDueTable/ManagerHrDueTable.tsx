'use client';
// RESPONSIBILITY: Presents the outstanding payroll-due workflow using RHF for draft state and the HR mutation hook for server reconciliation.
// DATA FLOW: Staff Query → React Hook Form → payDue mutation → backend message → Query invalidation
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useHrContext } from '@/app/manager/hr/hr_context/ManagerHrContext';
import { formatCurrency } from '@/lib/formatters';
import { SearchableDropdown as ManagerSearchableDropdown } from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { managerHrDueFormSchema, type ManagerHrDueFormValues } from '@/app/manager/hr/hr_utils/ManagerHrDueFormSchema';

export default function ManagerHrDueTable() {
  const { staff, payDue, saving } = useHrContext();
  const form = useForm<ManagerHrDueFormValues>({ resolver: zodResolver(managerHrDueFormSchema), defaultValues: { staffId: '', amount: 0, paymentMode: 'Bank Transfer', notes: '' } });
  const selectedStaffId = form.watch('staffId');
  const selectedStaff = useMemo(() => staff.find((member) => String(member.id) === selectedStaffId), [selectedStaffId, staff]);
  const staffWithDues = useMemo(() => staff.filter((member) => (member.currentDue || 0) > 0), [staff]);
  const staffOptions = useMemo(() => staff.map((member) => ({ value: String(member.id), label: `${member.name} (${member.role}) — Due: ${formatCurrency(member.currentDue || 0)}` })), [staff]);

  const handleStaffChange = (value: string | number) => {
    const staffId = String(value);
    const member = staff.find((entry) => String(entry.id) === staffId);
    form.setValue('staffId', staffId, { shouldDirty: true, shouldValidate: true });
    form.setValue('amount', member?.currentDue || 0, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = form.handleSubmit(async (values) => {
    await payDue({ staffId: values.staffId, amount: values.amount, notes: values.notes || '', paymentMode: values.paymentMode });
    form.reset({ ...values, amount: 0, notes: '' });
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {staffWithDues.length > 0 && (
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 flex gap-3 items-start">
          <AlertCircle className="text-warning mt-0.5" size={20} />
          <div><h4 className="font-semibold text-warning text-sm">Outstanding Dues</h4><p className="text-sm text-secondary mt-1">You have {staffWithDues.length} staff members with pending salary dues. Total outstanding: <strong className="ml-1 text-foreground">{formatCurrency(staffWithDues.reduce((sum, member) => sum + (member.currentDue || 0), 0))}</strong></p></div>
        </div>
      )}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold mb-6 text-foreground">Pay Outstanding Due</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium mb-1 text-foreground">Staff Member *</label><ManagerSearchableDropdown options={staffOptions} value={selectedStaffId} onChange={handleStaffChange} placeholder="Select Staff" />{form.formState.errors.staffId && <p className="text-xs text-danger mt-1">{form.formState.errors.staffId.message}</p>}</div>
          {selectedStaff && <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 text-sm"><p><strong>Current Due Amount:</strong> {formatCurrency(selectedStaff.currentDue || 0)}</p><p className="text-secondary text-xs mt-1">This is the unpaid portion of past payrolls.</p></div>}
          <div className="grid grid-cols-2 gap-4">
            <div><label htmlFor="manager-hr-due-amount" className="block text-sm font-medium mb-1 text-foreground">Amount to Pay (₹) *</label><input id="manager-hr-due-amount" type="number" min="1" max={selectedStaff?.currentDue || undefined} {...form.register('amount', { valueAsNumber: true })} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground" />{form.formState.errors.amount && <p className="text-xs text-danger mt-1">{form.formState.errors.amount.message}</p>}</div>
            <div><label className="block text-sm font-medium mb-1 text-foreground">Payment Mode</label><select {...form.register('paymentMode')} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground"><option value="Cash">Cash</option><option value="Bank Transfer">Bank Transfer</option><option value="UPI">UPI</option><option value="Cheque">Cheque</option></select></div>
          </div>
          <div><label htmlFor="manager-hr-due-notes" className="block text-sm font-medium mb-1 text-foreground">Notes</label><textarea id="manager-hr-due-notes" {...form.register('notes')} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground min-h-20" placeholder="Add payment notes" /></div>
          <div className="flex justify-end pt-4"><button type="submit" disabled={saving || !selectedStaffId} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50">{saving ? 'Processing...' : 'Pay Due'}</button></div>
        </form>
      </div>
    </div>
  );
}
