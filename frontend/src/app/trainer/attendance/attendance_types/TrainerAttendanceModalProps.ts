// RESPONSIBILITY: Owns the typed props contract for this component.
import type { AttendanceMemberBasic, CreateAttendanceDto } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

export interface TrainerAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: AttendanceMemberBasic[];
  saving: boolean;
  onSubmit: (data: CreateAttendanceDto) => Promise<void>;
}
