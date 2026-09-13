// RESPONSIBILITY: Mock fixture data for the Trainer Schedule module.
// DATA FLOW: useTrainerScheduleQuery → this fixture (NOW) → future: real API

import type { WeeklyAvailability, LeaveRequest } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';

export const MOCK_AVAILABILITY: WeeklyAvailability[] = [
  { day: 'Monday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Tuesday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Wednesday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Thursday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Friday', isAvailable: true, startTime: '06:00', endTime: '18:00' },
  { day: 'Saturday', isAvailable: false, startTime: '06:00', endTime: '12:00' },
  { day: 'Sunday', isAvailable: false, startTime: '00:00', endTime: '00:00' }
];

export const MOCK_LEAVES: LeaveRequest[] = [
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
