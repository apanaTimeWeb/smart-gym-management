// RESPONSIBILITY: Centralized constants, Zod schema, and mock data for the Schedule module.
import { z } from 'zod';
import type { ShiftDay, ShiftStatus, TrainerScheduleSummary, ScheduleKPIData } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';

export const SHIFT_DAYS: ShiftDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const SHIFT_STATUS_OPTIONS: ShiftStatus[] = ['Active', 'Off', 'Leave'];

export const SHIFT_STATUS_STYLES: Record<ShiftStatus, { text: string; bg: string }> = {
  Active: { text: 'text-success', bg: 'bg-success/10' },
  Off:    { text: 'text-secondary', bg: 'bg-border/40' },
  Leave:  { text: 'text-warning', bg: 'bg-warning/10' },
};

export const TIME_OPTIONS: string[] = [
  '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00',
];

export const ShiftSchema = z.object({
  trainerId: z.string().min(1, 'Please select a trainer'),
  day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  status: z.enum(['Active', 'Off', 'Leave']),
  notes: z.string().optional(),
}).refine(data => data.startTime < data.endTime, {
  message: 'End time must be after start time',
  path: ['endTime'],
});

export type ShiftFormValues = z.infer<typeof ShiftSchema>;

// ─── Mock data (replace with real API calls) ────────────────────────────────
export const MOCK_SCHEDULE_KPIS: ScheduleKPIData = {
  totalTrainers: 5,
  trainersOnDutyToday: 3,
  trainersOnLeaveToday: 1,
  totalShiftsThisWeek: 28,
  totalClassesThisWeek: 12,
  avgOccupancyRate: 78.5,
  totalEnrolledMembers: 94,
};

export const MOCK_TRAINERS: TrainerScheduleSummary[] = [
  {
    trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', isActive: true,
    totalShiftsPerWeek: 6, totalHoursPerWeek: 36,
    shifts: [
      { id: 's1', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Monday',    startTime: '06:00', endTime: '12:00', status: 'Active' },
      { id: 's2', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Tuesday',   startTime: '06:00', endTime: '12:00', status: 'Active' },
      { id: 's3', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Wednesday', startTime: '06:00', endTime: '12:00', status: 'Active' },
      { id: 's4', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Thursday',  startTime: '06:00', endTime: '12:00', status: 'Active' },
      { id: 's5', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Friday',    startTime: '06:00', endTime: '12:00', status: 'Active' },
      { id: 's6', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Saturday',  startTime: '07:00', endTime: '13:00', status: 'Active' },
    ],
  },
  {
    trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', isActive: true,
    totalShiftsPerWeek: 5, totalHoursPerWeek: 25,
    shifts: [
      { id: 's7',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Monday',    startTime: '16:00', endTime: '21:00', status: 'Active' },
      { id: 's8',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Tuesday',   startTime: '16:00', endTime: '21:00', status: 'Active' },
      { id: 's9',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Wednesday', startTime: '16:00', endTime: '21:00', status: 'Leave', notes: 'Medical leave' },
      { id: 's10', trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Friday',    startTime: '16:00', endTime: '21:00', status: 'Active' },
      { id: 's11', trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Saturday',  startTime: '09:00', endTime: '14:00', status: 'Active' },
    ],
  },
  {
    trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', isActive: true,
    totalShiftsPerWeek: 4, totalHoursPerWeek: 20,
    shifts: [
      { id: 's12', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Monday',    startTime: '07:00', endTime: '12:00', status: 'Active' },
      { id: 's13', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Wednesday', startTime: '07:00', endTime: '12:00', status: 'Active' },
      { id: 's14', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Friday',    startTime: '07:00', endTime: '12:00', status: 'Active' },
      { id: 's15', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Sunday',    startTime: '08:00', endTime: '13:00', status: 'Active' },
    ],
  },
];
