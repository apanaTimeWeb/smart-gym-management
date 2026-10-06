import { SHIFT_DAYS, SCHEDULE_SHIFT_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule/manager_schedule_constants/ManagerScheduleSharedConstants';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { QueryStatus } from '@tanstack/react-query';

export type ShiftDay = typeof SHIFT_DAYS[number];
export type ShiftStatus = typeof SCHEDULE_SHIFT_STATUS_VALUES[number];

// ─── Trainer Shift ────────────────────────────────────────────────────────────
export interface TrainerShift {
  id: string;
  trainerId: string;
  trainerName: string;
  trainerRole: string;
  day: ShiftDay;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
  notes?: string;
  // HIGHLY RECOMMENDED — needed for multi-location gyms and leave management
  location?: string;
  substituteTrainerId?: string;   // if on leave, who covers
}

// ─── Class Batch ──────────────────────────────────────────────────────────────
/** HIGHLY RECOMMENDED — was entirely missing. Needed for class occupancy tracking. */
export interface ClassBatch {
  id: string;
  name: string;                   // e.g. 'Morning Zumba'
  trainerId: string;
  trainerName: string;
  capacity: number;               // max members
  enrolledCount: number;          // currently enrolled
  dayOfWeek: ShiftDay;
  startTime: string;              // HH:mm
  endTime: string;                // HH:mm
  location?: string;              // e.g. 'Studio A', 'Main Floor'
  isActive: boolean;
}

// ─── Trainer Schedule Summary ─────────────────────────────────────────────────
export interface TrainerScheduleSummary {
  trainerId: string;
  trainerName: string;
  trainerRole: string;
  isActive: boolean;
  shifts: TrainerShift[];
  totalShiftsPerWeek: number;
  totalHoursPerWeek: number;
}

// ─── Schedule KPIs ────────────────────────────────────────────────────────────
export interface ScheduleKPIData {
  totalTrainers: number;
  trainersOnDutyToday: number;
  trainersOnLeaveToday: number;
  totalShiftsThisWeek: number;
  // HIGHLY RECOMMENDED — class occupancy metrics
  totalClassesThisWeek: number;
  avgOccupancyRate: number;       // percentage e.g. 78.5
  totalEnrolledMembers: number;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────
export interface CreateShiftDto {
  trainerId: string;
  day: ShiftDay;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
  notes?: string;
  location?: string;
  substituteTrainerId?: string;
}

export interface UpdateShiftDto extends Partial<CreateShiftDto> {}

// ─── Context ──────────────────────────────────────────────────────────────────
export interface ManagerScheduleViewModel {
  trainers: TrainerScheduleSummary[];
  kpis: ScheduleKPIData | null;
  status: QueryStatus;
  error: string;
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;
  selectedDay: ShiftDay | 'All';
  setSelectedDay: (day: ShiftDay | 'All') => void;
  search: string;
  setSearch: (s: string) => void;
  // Modal state
  shiftModal: { open: boolean; editShift: TrainerShift | null; trainerId: string | null };
  openAddShift: (trainerId: string) => void;
  openEditShift: (shift: TrainerShift) => void;
  closeShiftModal: () => void;
  saving: boolean;
  saveShift: (data: CreateShiftDto) => Promise<void>;
  deleteShift: (id: string) => Promise<void>;
}
