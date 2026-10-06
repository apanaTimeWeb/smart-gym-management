import { MANAGER_SCHEDULE_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleConstants';
import type { TrainerScheduleSummary, ScheduleKPIData } from '@/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes';

// Module-owned mock server data; production replaces the handler transport, not the UI contract. ────────────────────────────────
/**
 * @description Provides the ManagerScheduleMockData implementation for the schedule module.
 * @dependencies @/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
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
      { id: 's1', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Monday',    startTime: '06:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's2', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Tuesday',   startTime: '06:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's3', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Wednesday', startTime: '06:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's4', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Thursday',  startTime: '06:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's5', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Friday',    startTime: '06:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's6', trainerId: 't1', trainerName: 'Vikram Singh', trainerRole: 'Head Trainer', day: 'Saturday',  startTime: '07:00', endTime: '13:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
    ] },
  {
    trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', isActive: true,
    totalShiftsPerWeek: 5, totalHoursPerWeek: 25,
    shifts: [
      { id: 's7',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Monday',    startTime: '16:00', endTime: '21:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's8',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Tuesday',   startTime: '16:00', endTime: '21:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's9',  trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Wednesday', startTime: '16:00', endTime: '21:00', status: MANAGER_SCHEDULE_STATUS_VALUES.LEAVE, notes: 'Medical leave' },
      { id: 's10', trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Friday',    startTime: '16:00', endTime: '21:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's11', trainerId: 't2', trainerName: 'Priya Sharma', trainerRole: 'Personal Trainer', day: 'Saturday',  startTime: '09:00', endTime: '14:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
    ] },
  {
    trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', isActive: true,
    totalShiftsPerWeek: 4, totalHoursPerWeek: 20,
    shifts: [
      { id: 's12', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Monday',    startTime: '07:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's13', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Wednesday', startTime: '07:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's14', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Friday',    startTime: '07:00', endTime: '12:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
      { id: 's15', trainerId: 't3', trainerName: 'Rahul Mehta', trainerRole: 'Group Class Instructor', day: 'Sunday',    startTime: '08:00', endTime: '13:00', status: MANAGER_SCHEDULE_STATUS_VALUES.ACTIVE },
    ] },
];

