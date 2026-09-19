// RESPONSIBILITY: Centralized constants, Zod schema, and mock data for the Schedule module.
import type { ShiftDay, ShiftStatus } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';

export const SHIFT_DAYS: ShiftDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const SHIFT_STATUS_OPTIONS: ShiftStatus[] = ['Active', 'Off', 'Leave'];

export const SHIFT_STATUS_STYLES: Record<ShiftStatus, { text: string; bg: string }> = {
  Active: { text: 'text-success', bg: 'bg-success/10' },
  Off:    { text: 'text-secondary', bg: 'bg-border/40' },
  Leave:  { text: 'text-warning', bg: 'bg-warning/10' } };

export const TIME_OPTIONS: string[] = [
  '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00',
];

