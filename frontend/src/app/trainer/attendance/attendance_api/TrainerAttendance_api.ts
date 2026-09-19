import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { AttendanceUrlConfig } from '@/app/trainer/attendance/attendance_url_config';
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
import type { TrainerAttendanceFetchParams } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';


export interface AttendanceListResult {
  records: AttendanceRecord[];
  total: number;
}

export async function fetchAttendanceRecords(params: TrainerAttendanceFetchParams): Promise<AttendanceListResult> {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) queryParams.set(key, String(value));
  });
  const q = queryParams.toString();
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}?${q}`);
  const response = createTrainerApiResponseSchema(z.object({ attendance: z.array(AttendanceRecordSchema), total: z.number(), page: z.number(), limit: z.number() })).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { records: response.data.attendance, total: response.data.total };
}

export async function fetchAttendanceStats(): Promise<AttendanceStats> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.STATS}`);
  const response = createTrainerApiResponseSchema(AttendanceStatsSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

export async function fetchAttendanceMembersBasic(): Promise<AttendanceMemberBasic[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(AttendanceUrlConfig.BACKEND_API.MEMBERS_BASIC);
  const response = createTrainerApiResponseSchema(z.array(AttendanceMemberBasicSchema)).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

export async function createAttendanceRecord(dto: CreateAttendanceDto): Promise<{ data: AttendanceRecord; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  const response = createTrainerApiResponseSchema(AttendanceRecordSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { data: response.data, message: response.message };
}

export async function checkoutAttendance(staffId: string, checkOutTime: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.CHECKOUT(staffId)}`, {
    method: 'PATCH',
    body: JSON.stringify({ checkOutTime }),
  });
  const response = createTrainerApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}

export async function selfCheckInAttendance(staffId: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${AttendanceUrlConfig.BACKEND_API.BASE}`, {
    method: 'POST',
    body: JSON.stringify({ staffId, isSelfCheckIn: true }),
  });
  const response = createTrainerApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}
