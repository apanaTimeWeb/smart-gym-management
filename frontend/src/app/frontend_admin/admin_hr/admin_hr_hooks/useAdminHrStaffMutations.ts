"use client";

// RESPONSIBILITY: Owns Admin HR staff create/update/delete/status mutation orchestration and destructive confirmation.


import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrQueryKeys';
// DATA FLOW: HR form action → useAdminHrStaffMutations → AdminHrApi → TanStack Query cache.
import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminHrApi } from '@/app/frontend_admin/admin_hr/admin_hr_api/AdminHrApi';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
import type { Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
import type { AdminToastType } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutToastTypes';
/**
 * @description useAdminHrStaffMutations: Owns Admin HR staff create/update/delete/status mutation orchestration and destructive confirmation.
 * @dependencies Consumes AdminHrQueryKeys, AdminHrApi, useAdminLayoutConfirm, AdminLayoutIdempotencyIntentStore, AdminHrTypes, AdminLayoutToastTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminHrStaffMutations(
  editId: string | null,
  setShowModal: (open: boolean) => void,
  showToast: (message: string, type: AdminToastType, id?: string) => void,
) {
  const { confirm } = useAdminLayoutConfirm();
  const t = useTranslations();
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const invalidateHr = useCallback(() => queryClient.invalidateQueries({ queryKey: ADMIN_HR_QUERY_KEYS.key() }), [queryClient]);

  const createMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Staff>; idempotencyKey: string }) => AdminHrApi.createStaff(payload, idempotencyKey), onSuccess: () => { void invalidateHr(); } });
  const updateMutation = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Staff>; idempotencyKey: string }) => AdminHrApi.updateStaff(id, payload, idempotencyKey), onSuccess: () => { void invalidateHr(); } });
  const deleteMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminHrApi.deleteStaff(id, idempotencyKey), onSuccess: () => { void invalidateHr(); } });

  const saveStaff = useCallback(async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => {
    const payload: Partial<Staff> = {
      ...data,
      salary: Number(data.salary ?? 0),
      joinDate: data.joinDate ? new Date(data.joinDate).toISOString() : new Date().toISOString(),
      isActive: true,
    };
    const response = editId
      ? await updateMutation.mutateAsync({ id: editId, payload, idempotencyKey: getIntentKey(`update-staff:${editId}`) })
      : await createMutation.mutateAsync({ payload, idempotencyKey: getIntentKey('create-staff') });
    clearIntentKey(editId ? `update-staff:${editId}` : 'create-staff');
    showToast(response.message, 'success', 'hr-staff-create-success');
    setShowModal(false);
  }, [clearIntentKey, createMutation, editId, getIntentKey, setShowModal, showToast, updateMutation]);

  const deleteStaff = useCallback(async (id: string) => {
    const intentId = `delete-staff:${id}`;
    const confirmed = await confirm({
      title: t('hr.AdminHrMutations.auto_removeTitle'),
      message: t('hr.AdminHrMutations.auto_removeMessage'),
      confirmText: t('hr.AdminHrMutations.auto_removeConfirm'),
      type: 'danger',
    });
    if (!confirmed) { clearIntentKey(intentId); return; }
    const response = await deleteMutation.mutateAsync({ id, idempotencyKey: getIntentKey(intentId) });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-staff-update-success');
  }, [clearIntentKey, confirm, deleteMutation, getIntentKey, showToast, t]);

  const toggleStaffStatus = useCallback(async (staff: Staff) => {
    const isActivating = staff.isActive === false;
    const action = isActivating ? t('hr.AdminHrMutations.auto_activateTitle') : t('hr.AdminHrMutations.auto_suspendTitle');
    const confirmed = await confirm({
      title: action,
      message: t('hr.AdminHrMutations.auto_toggleMessage', { action: action.toLowerCase(), staffName: staff.name }),
      confirmText: isActivating ? t('hr.AdminHrMutations.auto_activateConfirm') : t('hr.AdminHrMutations.auto_suspendConfirm'),
      type: isActivating ? 'info' : 'danger',
    });
    if (!confirmed) return;
    const intentId = `toggle-staff:${staff.id}`;
    const response = await updateMutation.mutateAsync({ id: staff.id, payload: { isActive: isActivating }, idempotencyKey: getIntentKey(intentId) });
    clearIntentKey(intentId);
    showToast(response.message, 'success', 'hr-staff-delete-success');
  }, [clearIntentKey, confirm, getIntentKey, showToast, t, updateMutation]);

  return {
    saveStaff,
    deleteStaff,
    toggleStaffStatus,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}
