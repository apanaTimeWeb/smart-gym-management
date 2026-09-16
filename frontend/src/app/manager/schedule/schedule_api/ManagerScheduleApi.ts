import { apiFetch, type ApiResponse } from '@/lib/api';
import { ScheduleUrlConfig } from '@/app/manager/Manager_url_config';
import type { CreateShiftDto, ScheduleKPIData, TrainerScheduleSummary, TrainerShift } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import { z } from 'zod';

const shiftSchema = z.object({
  id: z.string(), trainerId: z.string(), trainerName: z.string(), trainerRole: z.string(),
  day: z.string(), startTime: z.string(), endTime: z.string(), status: z.string(), notes: z.string().optional(),
});
const trainerSchema = z.object({
  trainerId: z.string(), trainerName: z.string(), trainerRole: z.string(), isActive: z.boolean(),
  totalShiftsPerWeek: z.number(), totalHoursPerWeek: z.number(), shifts: z.array(shiftSchema),
});
const statsSchema = z.object({
  totalTrainers: z.number(), trainersOnDutyToday: z.number(), trainersOnLeaveToday: z.number(),
  totalShiftsThisWeek: z.number(), totalClassesThisWeek: z.number(), avgOccupancyRate: z.number(), totalEnrolledMembers: z.number(),
});

export const managerScheduleApi = {
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<{ trainers: TrainerScheduleSummary[]; kpis: ScheduleKPIData }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ScheduleUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ trainers: z.array(trainerSchema), kpis: statsSchema }),
    });
  },
  createShift: async (body: CreateShiftDto): Promise<ApiResponse<TrainerShift>> => apiFetch(`${ScheduleUrlConfig.BACKEND_API.BASE}/shifts`, { method: 'POST', body: JSON.stringify(body), dataSchema: shiftSchema }),
  updateShift: async (id: string, body: CreateShiftDto): Promise<ApiResponse<TrainerShift>> => apiFetch(`${ScheduleUrlConfig.BACKEND_API.BASE}/shifts/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: shiftSchema }),
  deleteShift: async (id: string): Promise<ApiResponse<{ id: string }>> => apiFetch(`${ScheduleUrlConfig.BACKEND_API.BASE}/shifts/${id}`, { method: 'DELETE', dataSchema: z.object({ id: z.string() }) }),
};
