'use client';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerHrApi } from '@/app/frontend_manager/manager_hr/manager_hr_api/ManagerHrApi';
import { ManagerHrQueryKeys } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrQueryKeys';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { Staff } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerHrStaffMutations.
 * @dependencies Uses ManagerHrApi, ManagerIdempotency, ManagerMoney, ManagerHrTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerHrStaffMutations owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerHrStaffMutations(
  staff: Staff[],
  editId: string | null,
  setShowModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const queryClient = useQueryClient();
  const saveIntentKeyRef = useRef<string | null>(null);
  const deleteIntentKeysRef = useRef(new Map<string, string>());
  const toggleIntentKeysRef = useRef(new Map<string, string>());

  const saveStaffMutation = useMutation({
    mutationFn: async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number; idempotencyKey: string }) => {
      const payload: Omit<Partial<Staff>, 'joinDate'> & { joinDate?: string | Date } = {
        ...data,
        salary: toManagerMinorUnits(Number(data.salary || 0)),
        advanceSalary: toManagerMinorUnits(Number(data.advanceSalary || 0)),
        joinDate: data.joinDate ? new Date(data.joinDate) : new Date(),
        isActive: true };
      return editId ? ManagerHrApi.updateStaff(editId, payload, data.idempotencyKey) : ManagerHrApi.createStaff(payload, data.idempotencyKey);
    },
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.staff() });
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.summary() });
      showToast(response.message, 'success');
      saveIntentKeyRef.current = null;
      setShowModal(false);
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const deleteStaffMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerHrApi.deleteStaff(id, idempotencyKey),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.staff() });
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.summary() });
      deleteIntentKeysRef.current.delete(variables.id);
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); } });

  const toggleStaffStatusMutation = useMutation({
    mutationFn: ({ id, isActive, idempotencyKey }: { id: string; isActive: boolean; idempotencyKey: string }) => ManagerHrApi.updateStaff(id, { isActive }, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (response, variables) => {
      if (!response.data) return;
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.staff() });
      queryClient.invalidateQueries({ queryKey: ManagerHrQueryKeys.summary() });
      toggleIntentKeysRef.current.delete(variables.id);
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const saveStaff = async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => {
    const idempotencyKey = saveIntentKeyRef.current ?? createManagerIdempotencyKey();
    saveIntentKeyRef.current = idempotencyKey;
    return saveStaffMutation.mutateAsync({ ...data, idempotencyKey });
  };
  const deleteStaff = async (id: string) => {
    const idempotencyKey = deleteIntentKeysRef.current.get(id) ?? createManagerIdempotencyKey();
    deleteIntentKeysRef.current.set(id, idempotencyKey);
    return deleteStaffMutation.mutateAsync({ id, idempotencyKey });
  };
  const toggleStaffStatus = async (item: Staff) => {
    const nextStatus = !item.isActive;
    const idempotencyKey = toggleIntentKeysRef.current.get(item.id) ?? createManagerIdempotencyKey();
    toggleIntentKeysRef.current.set(item.id, idempotencyKey);
    return toggleStaffStatusMutation.mutateAsync({ id: item.id, isActive: nextStatus, idempotencyKey });
  };

  return { saveStaff, deleteStaff, toggleStaffStatus };
}
