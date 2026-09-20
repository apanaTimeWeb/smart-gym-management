// RESPONSIBILITY: Typed props contract for the Attendance toolbar controls.
import type { AttendanceTab } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';
import type { AttendanceViewMode } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';

export interface TrainerAttendanceToolbarProps {
  tab: AttendanceTab;
  setTab: (tab: AttendanceTab) => void;
  viewMode: AttendanceViewMode;
  setViewMode?: (viewMode: AttendanceViewMode) => void;
  search: string;
  setSearch: (search: string) => void;
  filterDate: string;
  setFilterDate: (date: string) => void;
  onAddRecord: () => void;
  onRefresh: () => void | Promise<void>;
  onSelfCheckIn: () => void | Promise<void>;
  onSelfCheckOut: () => void | Promise<void>;
  selfCheckInPending: boolean;
  selfCheckOutPending: boolean;
  isRefreshing: boolean;
}
