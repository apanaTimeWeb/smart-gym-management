// RESPONSIBILITY: TypeScript types and interfaces for the Schedule module.
// HIGHLY RECOMMENDED additions: ClassBatch interface, location + substituteTrainerId
// on TrainerShift, class occupancy KPIs.

import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type ShiftDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type ShiftStatus = 'Active' | 'Off' | 'Leave';

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
export interface ScheduleContextType {
  trainers: TrainerScheduleSummary[];
  kpis: ScheduleKPIData | null;
  fetchState: FetchState;
  error: string;
  toast: { message: string; type: ToastType } | null;
  showToast: (msg: string, t: ToastType) => void;
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
