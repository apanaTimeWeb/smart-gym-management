// RESPONSIBILITY: Simulates the backend API for Trainer Schedule and Leaves.
// DATA FLOW: TanStack Query hooks → trainerScheduleApi → future apiFetch | mock fixture
import { z } from 'zod';
import {
  ScheduleResponseSchema,
  LeaveRequestSchema,
  type WeeklyAvailability,
  type LeaveRequest,
  type CreateLeaveDto,
  type ScheduleResponse
} from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { MOCK_AVAILABILITY, MOCK_LEAVES } from '@/app/trainer/schedule/schedule_fixtures/TrainerScheduleMockData';

// Mutable mock state for demo purposes
let currentAvailability = [...MOCK_AVAILABILITY];
let currentLeaves = [...MOCK_LEAVES];

export const trainerScheduleApi = {
  getSchedule: async (): Promise<ScheduleResponse> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return ScheduleResponseSchema.parse({
      availability: currentAvailability,
      leaves: currentLeaves,
    });
  },

  updateAvailability: async (data: WeeklyAvailability[]): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    currentAvailability = [...data];
    return { success: true };
  },

  requestLeave: async (data: CreateLeaveDto): Promise<{ success: boolean; data: LeaveRequest }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newLeave: LeaveRequest = {
      ...data,
      id: `LR-${Math.floor(Math.random() * 10000)}`,
      trainerId: 'TR-101',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    currentLeaves = [newLeave, ...currentLeaves];
    return { success: true, data: LeaveRequestSchema.parse(newLeave) };
  }
};
