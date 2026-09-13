import type { TrainerScheduleSummary, ScheduleKPIData } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';

export const MOCK_SCHEDULE_KPIS: ScheduleKPIData = {
  totalTrainers: 12,
  trainersOnDutyToday: 8,
  trainersOnLeaveToday: 2,
  totalShiftsThisWeek: 45,
  totalClassesThisWeek: 20,
  avgOccupancyRate: 85,
  totalEnrolledMembers: 120,
};

export const MOCK_TRAINERS: TrainerScheduleSummary[] = [
  {
    trainerId: 'T1',
    trainerName: 'Amit Kumar',
    trainerRole: 'Head Trainer',
    isActive: true,
    totalShiftsPerWeek: 5,
    totalHoursPerWeek: 40,
    shifts: [
      { id: 'S1', trainerId: 'T1', trainerName: 'Amit Kumar', trainerRole: 'Head Trainer', day: 'Monday', startTime: '06:00', endTime: '14:00', status: 'Active' },
      { id: 'S2', trainerId: 'T1', trainerName: 'Amit Kumar', trainerRole: 'Head Trainer', day: 'Tuesday', startTime: '06:00', endTime: '14:00', status: 'Active' },
    ],
  },
  {
    trainerId: 'T2',
    trainerName: 'Priya Singh',
    trainerRole: 'Yoga Instructor',
    isActive: true,
    totalShiftsPerWeek: 3,
    totalHoursPerWeek: 15,
    shifts: [
      { id: 'S3', trainerId: 'T2', trainerName: 'Priya Singh', trainerRole: 'Yoga Instructor', day: 'Wednesday', startTime: '17:00', endTime: '20:00', status: 'Active' },
      { id: 'S4', trainerId: 'T2', trainerName: 'Priya Singh', trainerRole: 'Yoga Instructor', day: 'Thursday', startTime: '17:00', endTime: '20:00', status: 'Active' },
    ],
  },
];
