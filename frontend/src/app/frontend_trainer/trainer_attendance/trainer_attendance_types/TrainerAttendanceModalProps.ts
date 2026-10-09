// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerAttendanceMemberBasic, TrainerAttendanceCreateDto } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceTypes';

export interface TrainerAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: TrainerAttendanceMemberBasic[];
  saving: boolean;
  onSubmit: (data: TrainerAttendanceCreateDto) => Promise<void>;
  testId?: string;
}
