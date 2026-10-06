'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useMemo, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';
import { managerHrDueFormSchema } from '@/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrDueFormSchema';
import { ManagerHrFormatCurrency } from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { EMPTY_HR_DUE_FORM } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrFormTypes';
import type { ManagerHrDueFormValues } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrFormTypes';


/** Coordinates salary-due settlement and requires explicit confirmation before the mutation. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerHrDueForm.
 * @dependencies Uses ManagerHrFormatters, useManagerHrLogic, ManagerHrDueFormSchema, ManagerHrFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerHrDueForm owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerHrDueForm() {
  const t = useTranslations('MANAGER_HR');
  const locale = useLocale();
  const { staff, payDue, saving } = useManagerHrLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const form = useForm<ManagerHrDueFormValues>({ resolver: zodResolver(managerHrDueFormSchema), defaultValues: EMPTY_HR_DUE_FORM });
  const selectedStaffId = form.watch('staffId');
  const selectedStaff = useMemo(() => staff.find((member) => String(member.id) === selectedStaffId), [selectedStaffId, staff]);
  const staffWithDues = useMemo(() => staff.filter((member) => (member.currentDue || 0) > 0), [locale, staff]);
  const staffOptions = useMemo(() => staff.map((member) => ({ value: String(member.id), label: `${member.name} (${member.role}) — Due: ${ManagerHrFormatCurrency(member.currentDue || 0, ManagerEnvConfig.currencyCode, locale)}` })), [locale, staff]);
  const handleStaffChange = (value: string | number) => { const id = String(value); const member = staff.find((entry) => String(entry.id) === id); form.setValue('staffId', id, { shouldDirty: true, shouldValidate: true }); form.setValue('amount', member?.currentDue || 0, { shouldDirty: true, shouldValidate: true }); };
  const { confirmAndClose } = useManagerUnsavedChangesGuard(form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => form.reset(EMPTY_HR_DUE_FORM)); };
  const submit = form.handleSubmit(async (values) => {
    const confirmed = await confirm({ title: t('CONFIRM_DUE_PAYMENT_TITLE'), message: t('CONFIRM_DUE_PAYMENT_MESSAGE'), confirmText: t('CONFIRM_PAYMENT'), type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= createManagerIdempotencyKey();
    await payDue({ staffId: values.staffId, amount: toManagerMinorUnits(values.amount), notes: values.notes || '', paymentMode: values.paymentMode }, keyRef.current);
    form.reset({ ...values, amount: 0, notes: '' });
    keyRef.current = null;
  });
  return { staff, saving, form, selectedStaffId, selectedStaff, staffWithDues, staffOptions, handleStaffChange, submit, handleClose };
}
