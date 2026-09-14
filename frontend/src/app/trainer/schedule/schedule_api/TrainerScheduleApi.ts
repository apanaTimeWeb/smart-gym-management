import { z } from 'zod';
import {
  ScheduleResponseSchema,
  LeaveRequestSchema,
  type WeeklyAvailability,
  type LeaveRequest,
  type CreateLeaveDto,
  type ScheduleResponse
} from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { apiFetch } from '@/lib/api';
import { ScheduleUrlConfig } from '@/app/trainer/schedule/schedule_url_config';

export const trainerScheduleApi = {
  getSchedule: async (): Promise<ScheduleResponse> => {
    const raw = await apiFetch<any>(ScheduleUrlConfig.BACKEND_API.SCHEDULE);
    return ScheduleResponseSchema.parse(raw);
  },

  updateAvailability: async (data: WeeklyAvailability[]): Promise<{ success: boolean }> => {
    const raw = await apiFetch<any>(ScheduleUrlConfig.BACKEND_API.AVAILABILITY, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return raw;
  },

  requestLeave: async (data: CreateLeaveDto): Promise<{ success: boolean; data: LeaveRequest }> => {
    const raw = await apiFetch<any>(ScheduleUrlConfig.BACKEND_API.LEAVES, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { success: raw.success, data: LeaveRequestSchema.parse(raw.data) };
  }
};
