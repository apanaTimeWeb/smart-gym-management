import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { AttendanceUrlConfig } from '@/app/trainer/Trainer_url_config';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';
import {
  AttendanceRecordSchema,
  AttendanceStatsSchema,
  AttendanceMemberBasicSchema,
  type AttendanceRecord,
  type AttendanceStats,
  type AttendanceMemberBasic,
  type CreateAttendanceDto,
} from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

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
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}?${q}`);
  const response = createTrainerApiResponseSchema(z.object({ attendance: z.array(AttendanceRecordSchema), total: z.number(), page: z.number(), limit: z.number() })).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { records: response.data.attendance, total: response.data.total };
}

export async function fetchAttendanceStats(): Promise<AttendanceStats> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}/stats`);
  const response = createTrainerApiResponseSchema(AttendanceStatsSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

export async function fetchAttendanceMembersBasic(): Promise<AttendanceMemberBasic[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}/members-basic`);
  const response = createTrainerApiResponseSchema(z.array(AttendanceMemberBasicSchema)).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

export async function createAttendanceRecord(dto: CreateAttendanceDto): Promise<AttendanceRecord> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  const response = createTrainerApiResponseSchema(AttendanceRecordSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

export async function checkoutAttendance(staffId: string, checkOutTime: string): Promise<void> {
  await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}/checkout/${staffId}`, {
    method: 'PATCH',
    body: JSON.stringify({ checkOutTime }),
  });
}

export async function selfCheckInAttendance(staffId: string): Promise<void> {
  await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}`, {
    method: 'POST',
    body: JSON.stringify({ staffId, isSelfCheckIn: true }),
  });
}
