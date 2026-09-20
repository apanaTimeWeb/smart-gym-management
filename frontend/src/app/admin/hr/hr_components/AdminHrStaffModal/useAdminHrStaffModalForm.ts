"use client";
// RESPONSIBILITY: Owns React Hook Form state, branch assignment selection, password visibility, dirty-state protection, and modal lifecycle for AdminHrStaffModal.
// DATA FLOW: HR staff/branch queries → React Hook Form → Zod validation → HR staff mutation → TanStack Query refresh.

import React, { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import { useAdminHrBranchReference } from '@/app/admin/hr/hr_context/useAdminHrBranchReference';
import { useUnsavedChangesGuard } from '@/app/admin/admin_layout/admin_utils/useAdminUnsavedChangesGuard';
import { staffFormSchema } from '@/app/admin/hr/hr_types/AdminHrSchemas';
import { EMPTY_STAFF, STAFF_MODAL_FIELDS } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import type { AdminHrBranchReference, StaffFormValues } from '@/app/admin/hr/hr_types/AdminHrTypes';

/** Owns staff modal state and exposes branch-selection helpers to the presentation component. */
export function useAdminHrStaffModalForm() {
  const { showModal, setShowModal, editId, editData, saveStaff, saving } = useHrContext();
  const { data: branches = [] } = useAdminHrBranchReference();
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema) as unknown as Resolver<StaffFormValues>,
    defaultValues: (editData as StaffFormValues) || EMPTY_STAFF,
  });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useUnsavedChangesGuard(isDirty);
  const formValues = useWatch({ control });
  const selectedRole = formValues.role ?? (editData as StaffFormValues)?.role;
  const isManager = selectedRole === 'Manager';
  const assignedBranches = formValues.assignedBranches ?? (editData as StaffFormValues)?.assignedBranches ?? [];

  // EFFECT: Rehydrates the staff form when the create/edit modal opens with the current record.
  useEffect(() => {
    if (showModal) reset({ ...EMPTY_STAFF, ...(editData || {}) } as StaffFormValues);
  }, [editData, reset, showModal]);

  const handleClose = useCallback(async () => {
    if (await confirmDiscardIfDirty()) setShowModal(false);
  }, [confirmDiscardIfDirty, setShowModal]);

  const getBranchLabel = useCallback((id: string) => {
    const branch = (branches as AdminHrBranchReference[]).find((item) => item.id === id);
    return branch ? branch.name : id;
  }, [branches]);

  const toggleAssignedBranch = useCallback((branchId: string, checked: boolean) => {
    const next = checked
      ? [...assignedBranches, branchId]
      : assignedBranches.filter((id) => id !== branchId);
    setValue('assignedBranches', next, { shouldDirty: true });
    if (!checked && (formValues.primaryBranchId ?? (editData as StaffFormValues)?.primaryBranchId) === branchId) {
      setValue('primaryBranchId', '', { shouldDirty: true });
    }
  }, [assignedBranches, editData, formValues.primaryBranchId, setValue]);

  const togglePasswordVisibility = useCallback(() => setShowPassword((current) => !current), []);

  return { showModal, setShowModal, editId, editData, saveStaff, saving, branches: branches as AdminHrBranchReference[], showPassword, togglePasswordVisibility, register, handleSubmit, control, errors, isManager, assignedBranches, getBranchLabel, toggleAssignedBranch, handleClose, STAFF_MODAL_FIELDS, setValue };
}
