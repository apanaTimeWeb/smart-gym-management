import { z } from 'zod';
import { apiFetch } from '@/lib/api';
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

export async function fetchAttendanceRecords(params: AttendanceFetchParams): Promise<AttendanceListResult> {
  const q = new URLSearchParams({ ...params as Record<string, string> }).toString();
  const raw = await apiFetch<any>(`${AttendanceUrlConfig.BACKEND_API.BASE}?${q}`);
  
  const records = z.array(AttendanceRecordSchema).parse(raw.attendance || []);
  return { records, total: raw.total || 0 };
}

export async function fetchAttendanceStats(): Promise<AttendanceStats> {
  const raw = await apiFetch<any>(`${AttendanceUrlConfig.BACKEND_API.BASE}/stats`);
  return AttendanceStatsSchema.parse(raw);
}

export async function fetchAttendanceMembersBasic(): Promise<AttendanceMemberBasic[]> {
  const raw = await apiFetch<any>(`${AttendanceUrlConfig.BACKEND_API.BASE}/members-basic`);
  return z.array(AttendanceMemberBasicSchema).parse(raw);
}

export async function createAttendanceRecord(dto: CreateAttendanceDto): Promise<AttendanceRecord> {
  const raw = await apiFetch<any>(`${AttendanceUrlConfig.BACKEND_API.BASE}`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return AttendanceRecordSchema.parse(raw);
}

export async function checkoutAttendance(staffId: string, checkOutTime: string): Promise<void> {
  await apiFetch<any>(`${AttendanceUrlConfig.BACKEND_API.BASE}/checkout/${staffId}`, {
    method: 'PATCH',
    body: JSON.stringify({ checkOutTime }),
  });
}

export async function selfCheckInAttendance(staffId: string): Promise<void> {
  await apiFetch<any>(`${AttendanceUrlConfig.BACKEND_API.BASE}`, {
    method: 'POST',
    body: JSON.stringify({ staffId, isSelfCheckIn: true }),
  });
}
