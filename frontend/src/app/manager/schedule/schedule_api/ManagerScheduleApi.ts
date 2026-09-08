// RESPONSIBILITY: Strongly-typed network calls for the Schedule module.
import { apiFetch } from '@/lib/api';
import { ManagerScheduleUrlConfig } from '@/app/manager/schedule/ManagerScheduleUrlConfig';
import type { TrainerScheduleSummary, ScheduleKPIData, CreateShiftDto, UpdateShiftDto, TrainerShift } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import type { ApiResponse } from '@/lib/api';

export const scheduleApi = {
  getTrainers: () =>
    apiFetch<ApiResponse<{ trainers: TrainerScheduleSummary[] }>>(ManagerScheduleUrlConfig.BACKEND_API.TRAINERS),

  getKPIs: () =>
    apiFetch<ApiResponse<ScheduleKPIData>>(ManagerScheduleUrlConfig.BACKEND_API.KPIS),

  createShift: (body: CreateShiftDto) =>
    apiFetch<ApiResponse<TrainerShift>>(ManagerScheduleUrlConfig.BACKEND_API.SHIFTS_BASE, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  updateShift: (id: string, body: UpdateShiftDto) =>
    apiFetch<ApiResponse<TrainerShift>>(ManagerScheduleUrlConfig.BACKEND_API.SHIFT_UPDATE(id), {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  deleteShift: (id: string) =>
    apiFetch<ApiResponse<null>>(ManagerScheduleUrlConfig.BACKEND_API.SHIFT_DELETE(id), { method: 'DELETE' }),
};
