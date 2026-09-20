// DATA FLOW: Manager module state/API data → useManagerScheduleQueries → owning Manager UI components.
'use client';
/** Manages UseScheduleQueries for the Manager module. */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { managerScheduleApi } from '@/app/manager/schedule/schedule_api/ManagerScheduleApi';
import type { CreateShiftDto } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';


export const managerScheduleQueryKeys = {
  all: ['manager', 'schedule'] as const,
  list: (filters: Record<string, string>) => [...managerScheduleQueryKeys.all, 'list', filters] as const };

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerScheduleQuery(filters: Record<string, string>) {
  return useQuery({ queryKey: managerScheduleQueryKeys.list(filters), queryFn: () => managerScheduleApi.fetchSchedule(filters).then(res => res.data) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerScheduleMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: managerScheduleQueryKeys.all });
  const create = useMutation({ mutationFn: (body: CreateShiftDto) => managerScheduleApi.createShift(body), onSuccess: invalidate });
  const update = useMutation({ mutationFn: ({ id, body }: { id: string; body: CreateShiftDto }) => managerScheduleApi.updateShift(id, body), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => managerScheduleApi.deleteShift(id, idempotencyKey), onSuccess: invalidate });
  return { create, update, remove };
}
