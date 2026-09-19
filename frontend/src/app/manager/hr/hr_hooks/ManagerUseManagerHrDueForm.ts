'use client';
// RESPONSIBILITY: Owns outstanding-due payment form setup, validation, submission and dirty-state confirmation.
// DATA FLOW: HR staff query → RHF/Zod draft → confirmation → due-payment mutation → query invalidation → UI.
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { managerHrDueFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrDueFormSchema';
import type { ManagerHrDueFormValues } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { EMPTY_HR_DUE_FORM } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';

/** Coordinates salary-due settlement and requires explicit confirmation before the mutation. */
export function useManagerHrDueForm() {
  const { staff, payDue, saving } = useManagerHrLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const form = useForm<ManagerHrDueFormValues>({ resolver: zodResolver(managerHrDueFormSchema), defaultValues: EMPTY_HR_DUE_FORM });
  const selectedStaffId = form.watch('staffId');
  const selectedStaff = useMemo(() => staff.find((member) => String(member.id) === selectedStaffId), [selectedStaffId, staff]);
  const staffWithDues = useMemo(() => staff.filter((member) => (member.currentDue || 0) > 0), [staff]);
  const staffOptions = useMemo(() => staff.map((member) => ({ value: String(member.id), label: `${member.name} (${member.role}) — Due: ${formatCurrencyFromMinorUnits(member.currentDue || 0, ManagerEnvConfig.currencyCode)}` })), [staff]);
  const handleStaffChange = (value: string | number) => { const id = String(value); const member = staff.find((entry) => String(entry.id) === id); form.setValue('staffId', id, { shouldDirty: true, shouldValidate: true }); form.setValue('amount', member?.currentDue || 0, { shouldDirty: true, shouldValidate: true }); };
  const { confirmAndClose } = useManagerUnsavedChangesGuard(form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => form.reset(EMPTY_HR_DUE_FORM)); };
  const submit = form.handleSubmit(async (values) => {
    const confirmed = await confirm({ title: 'Confirm Due Payment', message: 'This will record a salary due payment. Continue?', confirmText: 'Confirm Payment', type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= createManagerIdempotencyKey();
    await payDue({ staffId: values.staffId, amount: toManagerMinorUnits(values.amount), notes: values.notes || '', paymentMode: values.paymentMode }, keyRef.current);
    form.reset({ ...values, amount: 0, notes: '' });
    keyRef.current = null;
  });
  return { staff, saving, form, selectedStaffId, selectedStaff, staffWithDues, staffOptions, handleStaffChange, submit, handleClose };
}
