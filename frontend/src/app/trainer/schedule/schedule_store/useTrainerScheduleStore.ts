// RESPONSIBILITY: Zustand store that manages all async data for the Trainer Schedule module.
import { create } from 'zustand';
import { trainerScheduleApi } from '@/app/trainer/schedule/schedule_api/TrainerScheduleApi';
import type { TrainerScheduleState } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';

export const useTrainerScheduleStore = create<TrainerScheduleState>((set, get) => ({
  availability: [],
  leaveRequests: [],
  fetchState: 'idle',
  saving: false,

  loadSchedule: async () => {
    set({ fetchState: 'loading' });
    try {
      const res = await trainerScheduleApi.getSchedule();
      set({
        availability: res.data.availability,
        leaveRequests: res.data.leaves,
        fetchState: 'success'
      });
    } catch {
      set({ fetchState: 'error' });
    }
  },

  updateAvailability: async (data) => {
    set({ saving: true });
    try {
      await trainerScheduleApi.updateAvailability(data);
      await get().loadSchedule(); // Re-fetch to confirm
    } finally {
      set({ saving: false });
    }
  },

  requestLeave: async (data) => {
    set({ saving: true });
    try {
      await trainerScheduleApi.requestLeave(data);
      await get().loadSchedule();
    } finally {
      set({ saving: false });
    }
  }
}));
