// DATA FLOW: HR staff query → RHF/Zod draft → confirmation → advance mutation → query invalidation → UI.
// RESPONSIBILITY: Owns staff advance form setup, validation, submission and dirty-state confirmation.
'use client';
import { useMemo, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';

import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { managerHrAdvanceFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrAdvanceFormSchema';
import { EMPTY_HR_ADVANCE_FORM } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { ManagerHrAdvanceFormValues } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { useLocale } from "next-intl";

/** Coordinates the staff advance payment editor and its critical-action confirmation. */
export function useManagerHrAdvanceForm() {
    const locale = useLocale();
  const { staff, giveAdvance, saving } = useManagerHrLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const form = useForm<ManagerHrAdvanceFormValues>({ resolver: zodResolver(managerHrAdvanceFormSchema), defaultValues: EMPTY_HR_ADVANCE_FORM });
  const selectedStaffId = form.watch('staffId');
  const selectedStaff = useMemo(() => staff.find((member) => String(member.id) === selectedStaffId), [selectedStaffId, staff]);
  const staffOptions = useMemo(() => staff.map((member) => ({ value: String(member.id), label: `${member.name} (${member.role}) — Balance: ${formatCurrency(member.advanceSalary || 0, ManagerEnvConfig.currencyCode, locale)}` })), [staff]);
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
