'use client';
// RESPONSIBILITY: Owns staff create/edit form setup, synchronization, validation, submission, and dirty-state protection.
// DATA FLOW: HR UI state → RHF/Zod → staff mutation → backend message/cache → staff UI.
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { managerHrStaffFormSchema } from '@/app/manager/hr/hr_schemas/ManagerHrStaffFormSchema';
import type { StaffFormValues } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { EMPTY_STAFF } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { fromManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';

/** Coordinates staff editor lifecycle independently of the modal rendering tree. */
export function useManagerHrStaffForm() {
  const { showModal, setShowModal, editId, editData, saveStaff, saving } = useManagerHrLogic();
  const form = useForm<StaffFormValues>({ resolver: zodResolver(managerHrStaffFormSchema as any), defaultValues: EMPTY_STAFF });
  useEffect(() => {
    if (!showModal) return;
    const source = (editData as Partial<StaffFormValues> | null) ?? {};
    form.reset({
      ...EMPTY_STAFF,
      ...source,
      salary: source.salary === undefined ? 0 : fromManagerMinorUnits(Number(source.salary)),
      advanceSalary: source.advanceSalary === undefined ? 0 : fromManagerMinorUnits(Number(source.advanceSalary)),
      joinDate: source.joinDate ? new Date(source.joinDate).toISOString().slice(0, 10) : EMPTY_STAFF.joinDate,
    });
  }, [editData, form, showModal]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(showModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowModal(false)); };
  const submit = form.handleSubmit(async (values) => { saveStaff(values); form.reset(values); });
  return { showModal, editId, saving, form, handleClose, submit };
}
