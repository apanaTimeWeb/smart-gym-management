// RESPONSIBILITY: Strongly-typed network calls for the Schedule module.
import { apiFetch } from '@/lib/api';
import { ManagerScheduleUrlConfig } from '@/app/manager/schedule/ManagerScheduleUrlConfig';
import type { TrainerScheduleSummary, ScheduleKPIData, CreateShiftDto, UpdateShiftDto, TrainerShift } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import type { ApiResponse } from '@/lib/api';

import { MOCK_TRAINERS, MOCK_SCHEDULE_KPIS } from '@/app/manager/schedule/schedule_fixtures/ManagerScheduleMockData';

export const scheduleApi = {
  getTrainers: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { trainers: MOCK_TRAINERS } };
  },

  getKPIs: async () => {
    await new Promise(res => setTimeout(res, 200));
    return { success: true, message: 'Success', data: MOCK_SCHEDULE_KPIS };
  },

  createShift: async (body: CreateShiftDto) => {
    await new Promise(res => setTimeout(res, 400));
    const newShift: TrainerShift = {
      id: `S${Date.now()}`,
      trainerId: body.trainerId,
      trainerName: 'Mock Trainer', // In real app, look up trainer
      trainerRole: 'Trainer',
      day: body.day,
      startTime: body.startTime,
      endTime: body.endTime,
      status: body.status,
      notes: body.notes,
      location: body.location,
      substituteTrainerId: body.substituteTrainerId,
    };
    return { success: true, message: 'Shift created', data: newShift };
  },

  updateShift: async (id: string, body: UpdateShiftDto) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Shift updated', data: { id, ...body } as TrainerShift };
  },

  deleteShift: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Shift deleted', data: null };
  },
};
