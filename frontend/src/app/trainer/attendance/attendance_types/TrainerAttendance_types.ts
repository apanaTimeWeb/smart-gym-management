// RESPONSIBILITY: Zod schemas and derived types for the Attendance module.
// DATA FLOW: API layer → Zod parse → typed domain types → TanStack Query → UI
import { z } from 'zod';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import type { AttendanceTab } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';

// ─── Domain Schemas ─────────────────────────────────────────────────────────

export const AttendanceMemberSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
});
export type AttendanceMember = z.infer<typeof AttendanceMemberSchema>;

export const AttendanceRecordSchema = z.object({
  id: z.string(),
  type: z.enum(['MEMBER', 'STAFF']),
  date: z.string(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  durationMinutes: z.number().optional(),
  checkInMethod: z.string().optional(),
  notes: z.string().optional(),
  staffId: z.union([z.string(), z.number()]).transform(String).optional(),
  memberId: z.union([z.string(), z.number()]).transform(String).optional(),
  member: AttendanceMemberSchema.optional(),
  staff: AttendanceMemberSchema.optional(),
});
export type AttendanceRecord = z.infer<typeof AttendanceRecordSchema>;

export const AttendanceStatsSchema = z.object({
  totalCheckIns: z.number(),
  memberCheckIns: z.number(),
  staffCheckIns: z.number(),
});
export type AttendanceStats = z.infer<typeof AttendanceStatsSchema>;

export const AttendanceResponseSchema = z.object({
  attendance: z.array(AttendanceRecordSchema).optional(),
  attendances: z.array(AttendanceRecordSchema).optional(),
  total: z.number(),
});
export type AttendanceApiResponse = z.infer<typeof AttendanceResponseSchema>;

export const AttendanceMemberBasicSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  phone: z.string().optional(),
});
export type AttendanceMemberBasic = z.infer<typeof AttendanceMemberBasicSchema>;

// ─── Create DTO Schema ────────────────────────────────────────────────────────

export const CreateAttendanceDtoSchema = z.object({
  type: z.enum(['MEMBER', 'STAFF']),
  memberId: z.string().optional(),
  staffId: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  notes: z.string().optional(),
});
export type CreateAttendanceDto = z.infer<typeof CreateAttendanceDtoSchema>;

// ─── Legacy context shape kept for transition (will be removed after full migration) ──

/** @deprecated — replaced by query/store hooks. Use useAttendanceQuery + useTrainerAttendanceStore */
export interface AttendanceContextType {
  records: AttendanceRecord[];
  todayStats: AttendanceStats;
  members: AttendanceMemberBasic[];
  totalRecords: number;
  isFetching: boolean;
  saving: boolean;
  toast: { message: string; type: ToastType } | null;
  tab: AttendanceTab;
  setTab: (tab: AttendanceTab) => void;
  viewMode: 'calendar' | 'table';
  setViewMode: (v: 'calendar' | 'table') => void;
  search: string;
  setSearch: (s: string) => void;
  filterDate: string;
  setFilterDate: (d: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;
  refetch: () => void;
  markAttendance: (data: import('@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants').AttendanceFormValues) => Promise<void>;
  selfCheckIn: () => Promise<void>;
  selfCheckOut: () => Promise<void>;
}
