// RESPONSIBILITY: Defines strict types and API response interfaces for the Attendance module.
// Includes durationMinutes, lateMinutes, checkInMethod for time-tracking analytics.

import type { MemberSnapshot, StaffSnapshot } from '@/app/manager/attendance/attendance_types/ManagerAttendanceSnapshotTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { AttendanceFormValues } from '@/app/manager/attendance/attendance_types/ManagerAttendanceFormTypes';
import type { AttendanceTab } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import type { Dispatch, SetStateAction } from 'react';


export type ManagerAttendancePersonType = 'MEMBER' | 'STAFF';

// CRITICAL — DB column needed for analytics
export type CheckInMethod = 'QR' | 'Manual' | 'Biometric';

export interface Attendance {
  id: string;
  memberId?: number;
  staffId?: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  checkOutTime?: string;
  trainerId?: string;
  trainerName?: string;
  type: string;
  status?: string;
  member?: { name: string };
  staff?: { name: string };
  // CRITICAL — time-tracking analytics fields (DB columns)
  durationMinutes?: number;
  lateMinutes?: number;
  checkInMethod?: CheckInMethod;
}

export interface AttendanceStatsResponse {
  totalCheckIns: number;
  memberCheckIns: number;
  staffCheckIns: number;
}

export interface AttendanceResponse {
  attendance?: Attendance[];
  attendances?: Attendance[];
  total: number;
}

export interface ManagerAttendanceViewModel {
  records: Attendance[];
  todayStats: AttendanceStatsResponse;
  members: MemberSnapshot[];
  staff: StaffSnapshot[];
  totalRecords: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;
  toast: { message: string; type: ManagerToastType } | null;

  tab: AttendanceTab;
  setTab: (t: AttendanceTab) => void;

  search: string;
  setSearch: (s: string) => void;
  dateFilter: string;
  setDateFilter: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  showModal: boolean;
  setShowModal: (show: boolean) => void;

  calendarUser: { id: string; name: string; type: ManagerAttendancePersonType } | null;
  setCalendarUser: (user: { id: string; name: string; type: ManagerAttendancePersonType } | null) => void;

  form: AttendanceFormValues;
  setForm: Dispatch<SetStateAction<AttendanceFormValues>>;

  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;

  loadAll: () => Promise<void>;
  markAttendance: (data: AttendanceFormValues) => Promise<void>;
  exportAttendance: () => void;
}
