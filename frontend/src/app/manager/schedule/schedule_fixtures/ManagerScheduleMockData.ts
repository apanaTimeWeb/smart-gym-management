// RESPONSIBILITY: Module-owned MSW fixture data for Manager Schedule API scenarios.
import type { TrainerScheduleSummary, ScheduleKPIData } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';

// Module-owned mock server data; production replaces the handler transport, not the UI contract. ────────────────────────────────
export const MOCK_SCHEDULE_KPIS: ScheduleKPIData = {
  totalTrainers: 5,
  trainersOnDutyToday: 3,
  trainersOnLeaveToday: 1,
  totalShiftsThisWeek: 28,
  totalClassesThisWeek: 12,
  avgOccupancyRate: 78.5,
  totalEnrolledMembers: 94 };

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
    ] },
  {
    trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', isActive: true,
    totalShiftsPerWeek: 5, totalHoursPerWeek: 25,
    shifts: [
      { id: 's7',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Monday',    startTime: '16:00', endTime: '21:00', status: 'Active' },
      { id: 's8',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Tuesday',   startTime: '16:00', endTime: '21:00', status: 'Active' },
      { id: 's9',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Wednesday', startTime: '16:00', endTime: '21:00', status: 'Leave', notes: 'Medical leave' },
      { id: 's10', trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Friday',    startTime: '16:00', endTime: '21:00', status: 'Active' },
      { id: 's11', trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Saturday',  startTime: '09:00', endTime: '14:00', status: 'Active' },
    ] },
  {
    trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', isActive: true,
    totalShiftsPerWeek: 4, totalHoursPerWeek: 20,
    shifts: [
      { id: 's12', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Monday',    startTime: '07:00', endTime: '12:00', status: 'Active' },
      { id: 's13', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Wednesday', startTime: '07:00', endTime: '12:00', status: 'Active' },
      { id: 's14', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Friday',    startTime: '07:00', endTime: '12:00', status: 'Active' },
      { id: 's15', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Sunday',    startTime: '08:00', endTime: '13:00', status: 'Active' },
    ] },
];

