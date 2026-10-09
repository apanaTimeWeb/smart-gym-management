// RESPONSIBILITY: UI-only Zustand state contract for Trainer Attendance.
import type { TrainerAttendanceViewMode } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceInteractionTypes';

export interface TrainerAttendanceStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  viewMode: TrainerAttendanceViewMode;
  setViewMode: (viewMode: TrainerAttendanceViewMode) => void;
}
