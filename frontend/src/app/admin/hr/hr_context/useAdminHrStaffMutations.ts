"use client";

// DATA FLOW: HR form action → useAdminHrStaffMutations → AdminHrApi → TanStack Query cache.
// RESPONSIBILITY: Owns Admin HR staff create/update/delete/status mutation orchestration and destructive confirmation.
import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/admin/admin_layout/admin_utils/AdminIdempotencyIntentStore';
import type { Staff } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { AdminToastType } from '@/app/admin/admin_layout/AdminFeedback/AdminToastTypes';

export function useAdminHrStaffMutations(
  editId: string | null,
  setShowModal: (open: boolean) => void,
  showToast: (message: string, type: AdminToastType, id?: string) => void,
) {
  const { confirm } = useAdminConfirm();
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);

  const createMutation = useMutation({ mutationFn: (payload: Partial<Staff>) => hrApi.createStaff(payload) });
  const updateMutation = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<Staff> }) => hrApi.updateStaff(id, payload) });
  const deleteMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => hrApi.deleteStaff(id, idempotencyKey) });

  const saveStaff = useCallback(async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => {
    const payload: Partial<Staff> = {
      ...data,
      salary: Number(data.salary ?? 0),
      joinDate: data.joinDate ? new Date(data.joinDate).toISOString() : new Date().toISOString(),
      isActive: true,
    };
    const response = editId
      ? await updateMutation.mutateAsync({ id: editId, payload })
      : await createMutation.mutateAsync(payload);
    showToast(response.message, 'success', 'hr-staff-create-success');
    await queryClient.invalidateQueries({ queryKey: ['admin', 'hr'] });
    setShowModal(false);
  }, [createMutation, editId, queryClient, setShowModal, showToast, updateMutation]);

  const deleteStaff = useCallback(async (id: string) => {
    const intentId = `delete-staff:${id}`;
    const confirmed = await confirm({
      title: 'Remove Staff',
      message: 'Remove this staff member? This action cannot be undone.',
      confirmText: 'Remove',
      type: 'danger',
    });
    if (!confirmed) { clearIntentKey(intentId); return; }
    const response = await deleteMutation.mutateAsync({ id, idempotencyKey: getIntentKey(intentId) });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-staff-update-success');
    await queryClient.invalidateQueries({ queryKey: ['admin', 'hr'] });
  }, [clearIntentKey, confirm, deleteMutation, getIntentKey, queryClient, showToast]);

  const toggleStaffStatus = useCallback(async (staff: Staff) => {
    const isActivating = staff.isActive === false;
    const action = isActivating ? 'Activate' : 'Suspend';
    const confirmed = await confirm({
      title: `${action} Staff`,
      message: `Are you sure you want to ${action.toLowerCase()} ${staff.name}?`,
      confirmText: action,
      type: isActivating ? 'info' : 'danger',
    });
    if (!confirmed) return;
    const response = await updateMutation.mutateAsync({ id: staff.id, payload: { isActive: isActivating } });
    showToast(response.message, 'success', 'hr-staff-delete-success');
    await queryClient.invalidateQueries({ queryKey: ['admin', 'hr'] });
  }, [confirm, queryClient, showToast, updateMutation]);

  return {
    saveStaff,
    deleteStaff,
    toggleStaffStatus,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}
