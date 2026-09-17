'use client';
// RESPONSIBILITY: Presents staff advance-payment entry using RHF and the Manager HR mutation source of truth.
// DATA FLOW: Staff Query → React Hook Form → giveAdvance mutation → backend message → Query invalidation
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHrContext } from '@/app/manager/hr/hr_context/ManagerHrContext';
import { formatCurrency } from '@/lib/formatters';
import { SearchableDropdown as ManagerSearchableDropdown } from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { managerHrAdvanceFormSchema, type ManagerHrAdvanceFormValues } from '@/app/manager/hr/hr_utils/ManagerHrAdvanceFormSchema';

export default function ManagerHrAdvanceTable() {
  const { staff, giveAdvance, saving } = useHrContext();
  const form = useForm<ManagerHrAdvanceFormValues>({ resolver: zodResolver(managerHrAdvanceFormSchema), defaultValues: { staffId: '', amount: 0, paymentMode: 'Bank Transfer', notes: '' } });
  const selectedStaffId = form.watch('staffId');
  const selectedStaff = useMemo(() => staff.find((member) => String(member.id) === selectedStaffId), [selectedStaffId, staff]);
  const staffOptions = useMemo(() => staff.map((member) => ({ value: String(member.id), label: `${member.name} (${member.role}) — Balance: ${formatCurrency(member.advanceSalary || 0)}` })), [staff]);
  const onSubmit = form.handleSubmit(async (values) => {
    await giveAdvance({ staffId: values.staffId, amount: values.amount, notes: values.notes || '', paymentMode: values.paymentMode });
    form.reset({ ...values, amount: 0, notes: '' });
  });
  return <div className="max-w-2xl mx-auto bg-card p-6 rounded-xl border border-border"><h2 className="text-xl font-bold mb-6 text-foreground">Give Advance Payment</h2><form onSubmit={onSubmit} className="space-y-5"><div><label className="block text-sm font-medium mb-1 text-foreground">Staff Member *</label><ManagerSearchableDropdown options={staffOptions} value={selectedStaffId} onChange={(value) => form.setValue('staffId', String(value), { shouldDirty: true, shouldValidate: true })} placeholder="Select Staff" />{form.formState.errors.staffId && <p className="text-xs text-danger mt-1">{form.formState.errors.staffId.message}</p>}</div>{selectedStaff && <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 text-sm"><p><strong>Current Advance Balance:</strong> {formatCurrency(selectedStaff.advanceSalary || 0)}</p><p className="text-secondary text-xs mt-1">Advances are automatically deducted from the next payroll calculation.</p></div>}<div className="grid grid-cols-2 gap-4"><div><label htmlFor="manager-hr-advance-amount" className="block text-sm font-medium mb-1 text-foreground">Amount (₹) *</label><input id="manager-hr-advance-amount" type="number" min="1" {...form.register('amount', { valueAsNumber: true })} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground" />{form.formState.errors.amount && <p className="text-xs text-danger mt-1">{form.formState.errors.amount.message}</p>}</div><div><label className="block text-sm font-medium mb-1 text-foreground">Payment Mode</label><select {...form.register('paymentMode')} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground"><option value="Cash">Cash</option><option value="Bank Transfer">Bank Transfer</option><option value="UPI">UPI</option><option value="Cheque">Cheque</option></select></div></div><div><label htmlFor="manager-hr-advance-notes" className="block text-sm font-medium mb-1 text-foreground">Notes / Reason</label><textarea id="manager-hr-advance-notes" {...form.register('notes')} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground min-h-20" placeholder="Add payment notes" /></div><div className="flex justify-end pt-4"><button type="submit" disabled={saving || !selectedStaffId} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50">{saving ? 'Processing...' : 'Give Advance'}</button></div></form></div>;
}
