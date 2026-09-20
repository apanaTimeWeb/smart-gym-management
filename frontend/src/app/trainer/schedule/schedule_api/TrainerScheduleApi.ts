import { z } from 'zod';
import {
  ScheduleResponseSchema,
  LeaveRequestSchema,
  type WeeklyAvailability,
  type LeaveRequest,
  type CreateLeaveDto,
  type ScheduleResponse
} from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ScheduleUrlConfig } from '@/app/trainer/schedule/schedule_url_config';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

export const trainerScheduleApi = {
  fetchSchedule: async (): Promise<ScheduleResponse> => {
    const raw = await apiFetch<ApiResponse<unknown>>(ScheduleUrlConfig.BACKEND_API.SCHEDULE);
    const response = createTrainerApiResponseSchema(ScheduleResponseSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },

  updateAvailability: async (data: WeeklyAvailability[], idempotencyKey?: string): Promise<{ success: boolean; message: string }> => {
    const raw = await apiFetch<ApiResponse<unknown>>(ScheduleUrlConfig.BACKEND_API.AVAILABILITY, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    const response = createTrainerApiResponseSchema(z.null()).parse(raw);
    return { success: response.success, message: response.message };
  },

  requestLeave: async (data: CreateLeaveDto, idempotencyKey?: string): Promise<{ success: boolean; message: string; data: LeaveRequest }> => {
    const raw = await apiFetch<ApiResponse<unknown>>(ScheduleUrlConfig.BACKEND_API.LEAVES, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const response = createTrainerApiResponseSchema(LeaveRequestSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return { success: response.success, message: response.message, data: response.data };
  }
};
