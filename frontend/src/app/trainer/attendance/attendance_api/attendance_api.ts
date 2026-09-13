// RESPONSIBILITY: Provides strongly-typed network calls for attendance operations.
// DATA FLOW: TanStack Query hooks → attendanceApi → apiFetch (future) | mock fixture (now)
// FUTURE: Replace mock returns with real apiFetch calls when backend is ready.

import { z } from 'zod';
import { AttendanceUrlConfig } from '@/app/trainer/attendance/attendance_url_config';
import {
  AttendanceRecordSchema,
  AttendanceStatsSchema,
  AttendanceMemberBasicSchema,
  type AttendanceRecord,
  type AttendanceStats,
  type AttendanceMemberBasic,
  type CreateAttendanceDto,
} from '@/app/trainer/attendance/attendance_types/attendance_types';
import {
  MOCK_ATTENDANCE_RECORDS,
  MOCK_ATTENDANCE_STATS,
  MOCK_ATTENDANCE_MEMBERS,
} from '@/app/trainer/attendance/attendance_fixtures/TrainerAttendanceMockData';

export interface AttendanceFetchParams {
  page?: number;
  limit?: number;
  search?: string;
  date?: string;
  type?: 'MEMBER' | 'STAFF';
  staffId?: string;
}

export interface AttendanceListResult {
  records: AttendanceRecord[];
  total: number;
}

/** Fetch paginated attendance records. Mock: returns fixture data with client-side filter. */
export async function fetchAttendanceRecords(params: AttendanceFetchParams): Promise<AttendanceListResult> {
  // MOCK ONLY — replace body with real apiFetch when backend is ready:
  // const q = new URLSearchParams({ ...params as Record<string, string> }).toString();
  // const raw = await apiFetch<unknown>(`${AttendanceUrlConfig.BACKEND_API.BASE}?${q}`);
  // return AttendanceResponseSchema.parse(raw);
  await new Promise(res => setTimeout(res, 400));

  let filtered = MOCK_ATTENDANCE_RECORDS;
  if (params.type) filtered = filtered.filter(r => r.type === params.type);
  if (params.staffId) filtered = filtered.filter(r => r.staffId === params.staffId || r.staff?.id === params.staffId);
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(r =>
      r.member?.name?.toLowerCase().includes(q) ||
      r.staff?.name?.toLowerCase().includes(q)
    );
  }
  if (params.date && params.date !== 'All Time') {
    const today = new Date();
    filtered = filtered.filter(r => {
      const d = new Date(r.date);
      if (params.date === 'Today') return d.toDateString() === today.toDateString();
      if (params.date === 'Yesterday') {
        const yest = new Date(today);
        yest.setDate(yest.getDate() - 1);
        return d.toDateString() === yest.toDateString();
      }
      if (params.date === 'Last 7 Days') {
        const cutoff = new Date(today);
        cutoff.setDate(cutoff.getDate() - 7);
        return d >= cutoff;
      }
      if (params.date === 'This Month') {
        return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
      }
      return true;
    });
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const total = filtered.length;
  const start = (page - 1) * limit;
  const records = z.array(AttendanceRecordSchema).parse(filtered.slice(start, start + limit));
  return { records, total };
}

/** Fetch today's attendance stats. Mock: returns fixture stats. */
export async function fetchAttendanceStats(): Promise<AttendanceStats> {
  await new Promise(res => setTimeout(res, 200));
  return AttendanceStatsSchema.parse(MOCK_ATTENDANCE_STATS);
}

/** Fetch basic member list for dropdown. Mock: returns fixture members. */
export async function fetchAttendanceMembersBasic(): Promise<AttendanceMemberBasic[]> {
  await new Promise(res => setTimeout(res, 200));
  return z.array(AttendanceMemberBasicSchema).parse(MOCK_ATTENDANCE_MEMBERS);
}

/** Mark a new attendance record. Mock: returns constructed record. */
export async function createAttendanceRecord(dto: CreateAttendanceDto): Promise<AttendanceRecord> {
  await new Promise(res => setTimeout(res, 500));
  const record: AttendanceRecord = {
    id: `att-${Date.now()}`,
    type: dto.type,
    date: dto.date,
    checkIn: dto.checkIn,
    checkOut: dto.checkOut,
    notes: dto.notes,
    memberId: dto.memberId,
    staffId: dto.staffId,
    member: dto.memberId
      ? MOCK_ATTENDANCE_MEMBERS.find(m => m.id === dto.memberId)
      : undefined,
    checkInMethod: 'Manual',
  };
  return AttendanceRecordSchema.parse(record);
}

/** Trainer self check-out. Mock: updates the active record's checkout time. */
export async function checkoutAttendance(staffId: string, checkOutTime: string): Promise<void> {
  await new Promise(res => setTimeout(res, 300));
  // MOCK: no-op. Future: PATCH to AttendanceUrlConfig.BACKEND_API.CHECKOUT(staffId)
  void staffId;
  void checkOutTime;
}

/** Trainer self check-in. Mock: creates a new STAFF attendance record. */
export async function selfCheckInAttendance(staffId: string): Promise<void> {
  await new Promise(res => setTimeout(res, 300));
  // MOCK: no-op. Future: POST to AttendanceUrlConfig.BACKEND_API.BASE with staffId
  void staffId;
}
