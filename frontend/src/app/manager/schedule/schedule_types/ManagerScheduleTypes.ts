// RESPONSIBILITY: TypeScript types and interfaces for the Schedule module.
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export type ShiftDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type ShiftStatus = 'Active' | 'Off' | 'Leave';

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
}

export interface TrainerScheduleSummary {
  trainerId: string;
  trainerName: string;
  trainerRole: string;
  isActive: boolean;
  shifts: TrainerShift[];
  totalShiftsPerWeek: number;
  totalHoursPerWeek: number;
}

export interface ScheduleKPIData {
  totalTrainers: number;
  trainersOnDutyToday: number;
  trainersOnLeaveToday: number;
  totalShiftsThisWeek: number;
}

export interface CreateShiftDto {
  trainerId: string;
  day: ShiftDay;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
  notes?: string;
}

export interface UpdateShiftDto extends Partial<CreateShiftDto> {}

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
