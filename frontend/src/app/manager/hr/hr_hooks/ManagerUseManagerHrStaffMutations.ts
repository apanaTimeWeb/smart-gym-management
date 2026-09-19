'use client';
// DATA FLOW: Manager HR UI action → useMutation → ManagerHrApi → TanStack Query cache → HR UI.
/** Manages UseHrStaffMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Staff, HrSummary } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import { hrApi } from '@/app/manager/hr/hr_api/ManagerHrApi';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';

export function useManagerHrStaffMutations(
  staff: Staff[],
  setStaff: (updater: Staff[] | ((previous: Staff[]) => Staff[])) => void,
  setSummary: (updater: HrSummary | null | ((previous: HrSummary | null) => HrSummary | null)) => void,
  editId: string | null,
  setShowModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const queryClient = useQueryClient();

  const saveStaffMutation = useMutation({
    mutationFn: async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => {
      const payload: Partial<Staff> = {
        ...data,
        salary: toManagerMinorUnits(Number(data.salary || 0)),
        advanceSalary: toManagerMinorUnits(Number(data.advanceSalary || 0)),
        joinDate: data.joinDate ? new Date(data.joinDate).toISOString() : new Date().toISOString(),
        isActive: true };
      return editId ? hrApi.updateStaff(editId, payload) : hrApi.createStaff(payload);
    },
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      if (!response.data) return;
      setStaff((previous) => editId
        ? previous.map((item) => String(item.id) === String(editId) ? response.data as Staff : item)
        : [response.data as Staff, ...previous]);
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'summary'] });
      showToast(response.message, 'success');
      setShowModal(false);
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const deleteStaffMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => hrApi.deleteStaff(id, idempotencyKey),
    onSuccess: (response, id) => {
      setStaff((previous) => previous.filter((item) => String(item.id) !== String(id)));
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'summary'] });
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); } });

  const toggleStaffStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => hrApi.updateStaff(id, { isActive }),
    onMutate: () => setSaving(true),
    onSuccess: (response, variables) => {
      if (!response.data) return;
      setStaff((previous) => previous.map((item) => String(item.id) === String(variables.id) ? response.data as Staff : item));
      queryClient.invalidateQueries({ queryKey: ['manager', 'hr', 'summary'] });
      showToast(response.message, 'success');
    },
    onError: (error) => { if (error instanceof Error && error.message) showToast(error.message, 'error'); },
    onSettled: () => setSaving(false) });

  const saveStaff = (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => saveStaffMutation.mutate(data);
  const deleteStaff = async (id: string) => { deleteStaffMutation.mutate({ id, idempotencyKey: crypto.randomUUID() }); };
  const toggleStaffStatus = async (item: Staff) => {
    const nextStatus = !item.isActive;
    toggleStaffStatusMutation.mutate({ id: item.id, isActive: nextStatus });
  };

  return { saveStaff, deleteStaff, toggleStaffStatus };
}
