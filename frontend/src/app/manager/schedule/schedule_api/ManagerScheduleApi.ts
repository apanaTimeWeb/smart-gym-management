import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { managerScheduleShiftSchema, managerScheduleTrainerSchema, managerScheduleKpiSchema } from '@/app/manager/schedule/schedule_schemas/ManagerScheduleSchema';
import { ManagerScheduleUrlConfig } from '@/app/manager/schedule/schedule_url_config';
import type { CreateShiftDto, ScheduleKPIData, TrainerScheduleSummary, TrainerShift } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import type { ApiResponse } from '@/lib/api';


export const managerScheduleApi = {
  fetchSchedule: async (params?: Record<string, string>): Promise<ApiResponse<{ trainers: TrainerScheduleSummary[]; kpis: ScheduleKPIData }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerScheduleUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ trainers: z.array(managerScheduleTrainerSchema), kpis: managerScheduleKpiSchema }) });
  },
  createShift: async (body: CreateShiftDto): Promise<ApiResponse<TrainerShift>> => apiFetch(ManagerScheduleUrlConfig.BACKEND_API.SHIFTS, { method: 'POST', body: JSON.stringify(body), dataSchema: managerScheduleShiftSchema }),
  updateShift: async (id: string, body: CreateShiftDto): Promise<ApiResponse<TrainerShift>> => apiFetch(ManagerScheduleUrlConfig.BACKEND_API.SHIFT(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: managerScheduleShiftSchema }),
  deleteShift: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(ManagerScheduleUrlConfig.BACKEND_API.SHIFT(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) }) };
