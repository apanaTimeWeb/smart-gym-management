import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { managerScheduleShiftSchema, managerScheduleTrainerSchema, managerScheduleKpiSchema } from '@/app/frontend_manager/manager_schedule/manager_schedule_schemas/ManagerScheduleSchema';
import { ManagerScheduleUrlConfig } from '@/app/frontend_manager/manager_schedule/manager_schedule_url_config';
import type { CreateShiftDto, ScheduleKPIData, TrainerScheduleSummary, TrainerShift } from '@/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerScheduleApi implementation for the schedule module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_schedule/manager_schedule_schemas/ManagerScheduleSchema; @/app/frontend_manager/manager_schedule/manager_schedule_url_config; @/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerScheduleApi = {
  fetchSchedule: async (params?: Record<string, string>): Promise<ApiResponse<{ trainers: TrainerScheduleSummary[]; kpis: ScheduleKPIData }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerScheduleUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ trainers: z.array(managerScheduleTrainerSchema), kpis: managerScheduleKpiSchema }) });
  },
  createShift: async (body: CreateShiftDto, idempotencyKey: string): Promise<ApiResponse<TrainerShift>> => apiFetch(ManagerScheduleUrlConfig.BACKEND_API.SHIFTS, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerScheduleShiftSchema }),
  updateShift: async (id: string, body: CreateShiftDto, idempotencyKey: string): Promise<ApiResponse<TrainerShift>> => apiFetch(ManagerScheduleUrlConfig.BACKEND_API.SHIFT(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerScheduleShiftSchema }),
  deleteShift: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(ManagerScheduleUrlConfig.BACKEND_API.SHIFT(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) }) };
