'use client';
// DATA FLOW: Schedule create/update/delete intent → dedicated mutation hook → ManagerScheduleApi → query invalidation → schedule UI.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerScheduleApi } from '@/app/frontend_manager/manager_schedule/manager_schedule_api/ManagerScheduleApi';
import { ManagerScheduleQueryKeys } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleQueryKeys';
import type { CreateShiftDto } from '@/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes';

/**
 * @description Owns schedule create, update, and delete mutations and invalidates authoritative schedule server state after successful responses.
 * @dependencies Uses ManagerScheduleApi, ManagerScheduleQueryKeys, and caller-provided idempotency keys.
 * @edge-case Does not retain API response data locally; failed mutations leave the current server cache intact.
 */
export function useManagerScheduleMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ManagerScheduleQueryKeys.all });
  const create = useMutation({ mutationFn: ({ body, idempotencyKey }: { body: CreateShiftDto; idempotencyKey: string }) => ManagerScheduleApi.createShift(body, idempotencyKey), onSuccess: invalidate });
  const update = useMutation({ mutationFn: ({ id, body, idempotencyKey }: { id: string; body: CreateShiftDto; idempotencyKey: string }) => ManagerScheduleApi.updateShift(id, body, idempotencyKey), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerScheduleApi.deleteShift(id, idempotencyKey), onSuccess: invalidate });
  return { create, update, remove };
}
