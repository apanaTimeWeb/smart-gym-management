// RESPONSIBILITY: Simulates the backend API for Trainer Schedule and Leaves.
// DATA FLOW: trainerScheduleApi → useTrainerScheduleStore → ScheduleProvider → components
// NOTE: Replace `return new Promise(...)` calls with `return apiFetch(URL)` when backend is ready.
import type { WeeklyAvailability, LeaveRequest } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';

// Initial Mock Data
let MOCK_AVAILABILITY: WeeklyAvailability[] = [
  { day: 'Monday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Tuesday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Wednesday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Thursday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Friday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Saturday', isAvailable: false, startTime: '06:00', endTime: '12:00' },
  { day: 'Sunday', isAvailable: false, startTime: '00:00', endTime: '00:00' }
];

let MOCK_LEAVES: LeaveRequest[] = [
  {
    id: 'LR-001',
    trainerId: 'TR-101',
    startDate: '2024-11-15',
    endDate: '2024-11-16',
    reason: 'Family function',
    leaveType: 'Personal',
    status: 'APPROVED',
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'LR-002',
    trainerId: 'TR-101',
    startDate: '2024-12-25',
    endDate: '2024-12-26',
    reason: 'Holiday travel',
    leaveType: 'Casual Leave',
    status: 'PENDING',
    createdAt: '2024-12-01T10:00:00Z'
  }
];

export const trainerScheduleApi = {
  getSchedule: async () => {
    // In a real app, this would be: return apiFetch(TRAINER_SCHEDULE_API_URLS.BASE);
    return new Promise<{ data: { availability: WeeklyAvailability[], leaves: LeaveRequest[] } }>(resolve => {
      setTimeout(() => resolve({ data: { availability: [...MOCK_AVAILABILITY], leaves: [...MOCK_LEAVES] } }), 600);
    });
  },

  updateAvailability: async (data: WeeklyAvailability[]) => {
    // In a real app: return apiFetch(TRAINER_SCHEDULE_API_URLS.AVAILABILITY, { method: 'PUT', body: JSON.stringify(data) });
    return new Promise<{ success: boolean }>(resolve => {
      setTimeout(() => {
        MOCK_AVAILABILITY = [...data];
        resolve({ success: true });
      }, 500);
    });
  },

  requestLeave: async (data: Partial<LeaveRequest>) => {
    // In a real app: return apiFetch(TRAINER_SCHEDULE_API_URLS.LEAVES, { method: 'POST', body: JSON.stringify(data) });
    return new Promise<{ success: boolean }>(resolve => {
      setTimeout(() => {
        const newLeave: LeaveRequest = {
          ...data,
          id: `LR-${Math.floor(Math.random() * 10000)}`,
          trainerId: 'TR-101',
          status: 'PENDING',
          createdAt: new Date().toISOString()
        } as LeaveRequest;
        MOCK_LEAVES = [newLeave, ...MOCK_LEAVES];
        resolve({ success: true });
      }, 500);
    });
  }
};
