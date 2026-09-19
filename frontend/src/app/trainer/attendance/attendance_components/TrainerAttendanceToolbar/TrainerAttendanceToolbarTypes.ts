// RESPONSIBILITY: Prop contract for the Trainer Attendance toolbar view component.
import type { AttendanceTab } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';
import type { AttendanceViewMode } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';

export interface TrainerAttendanceToolbarProps {
  tab: AttendanceTab;
  setTab: (tab: AttendanceTab) => void;
  viewMode: AttendanceViewMode;
  search: string;
  setSearch: (search: string) => void;
  filterDate: string;
  setFilterDate: (date: string) => void;
  onAddRecord: () => void;
  onRefresh: () => void;
  onSelfCheckIn: () => void;
  onSelfCheckOut: () => void;
  selfCheckInPending: boolean;
  selfCheckOutPending: boolean;
  setViewMode?: (viewMode: AttendanceViewMode) => void;
}
