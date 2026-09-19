'use client';
// RESPONSIBILITY: Owns staff advance form setup, validation, submission and dirty-state confirmation.
// DATA FLOW: HR staff query → RHF/Zod draft → confirmation → advance mutation → query invalidation → UI.
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { managerHrAdvanceFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrAdvanceFormSchema';
import type { ManagerHrAdvanceFormValues } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { EMPTY_HR_ADVANCE_FORM } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';

/** Coordinates the staff advance payment editor and its critical-action confirmation. */
export function useManagerHrAdvanceForm() {
  const { staff, giveAdvance, saving } = useManagerHrLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const form = useForm<ManagerHrAdvanceFormValues>({ resolver: zodResolver(managerHrAdvanceFormSchema), defaultValues: EMPTY_HR_ADVANCE_FORM });
  const selectedStaffId = form.watch('staffId');
  const selectedStaff = useMemo(() => staff.find((member) => String(member.id) === selectedStaffId), [selectedStaffId, staff]);
  const staffOptions = useMemo(() => staff.map((member) => ({ value: String(member.id), label: `${member.name} (${member.role}) — Balance: ${formatCurrencyFromMinorUnits(member.advanceSalary || 0, ManagerEnvConfig.currencyCode)}` })), [staff]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => form.reset(EMPTY_HR_ADVANCE_FORM)); };
  const submit = form.handleSubmit(async (values) => {
    const confirmed = await confirm({ title: 'Confirm Advance Payment', message: 'This will create a staff advance payment record. Continue?', confirmText: 'Confirm Payment', type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= createManagerIdempotencyKey();
    await giveAdvance({ staffId: values.staffId, amount: toManagerMinorUnits(values.amount), notes: values.notes || '', paymentMode: values.paymentMode }, keyRef.current);
    form.reset({ ...values, amount: 0, notes: '' });
    keyRef.current = null;
  });
  return { staff, saving, form, selectedStaffId, selectedStaff, staffOptions, submit, handleClose };
}
