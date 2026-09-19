// RESPONSIBILITY: UI-only Zustand state contract for Trainer Attendance.
import type { AttendanceViewMode } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';

export interface TrainerAttendanceStore {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  viewMode: AttendanceViewMode;
  setViewMode: (viewMode: AttendanceViewMode) => void;
}
