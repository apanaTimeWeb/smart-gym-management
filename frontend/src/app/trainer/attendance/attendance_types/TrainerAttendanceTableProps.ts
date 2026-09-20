// RESPONSIBILITY: Owns the typed props contract for this component.
import type { AttendanceRecord } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

export interface TrainerAttendanceTableProps {
  records: AttendanceRecord[];
  totalRecords: number;
  isLoading: boolean;
  search: string;
  filterDate: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}
