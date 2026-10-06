'use client';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';
import { managerHrStaffFormSchema } from '@/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrStaffFormSchema';
import { fromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { EMPTY_STAFF } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrFormTypes';
import type { StaffFormValues } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrFormTypes';
import type { Resolver } from 'react-hook-form';


/** Coordinates staff editor lifecycle independently of the modal rendering tree. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerHrStaffForm.
 * @dependencies Uses useManagerHrLogic, ManagerHrStaffFormSchema, ManagerHrFormTypes, ManagerMoney.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerHrStaffForm owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerHrStaffForm() {
  const { showModal, setShowModal, editId, editData, saveStaff, saving } = useManagerHrLogic();
  const form = useForm<StaffFormValues>({ resolver: zodResolver(managerHrStaffFormSchema) as Resolver<StaffFormValues>, defaultValues: EMPTY_STAFF });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
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
  const submit = form.handleSubmit(async (values) => { await saveStaff(values); form.reset(values); });
  return { showModal, editId, saving, form, handleClose, submit };
}
