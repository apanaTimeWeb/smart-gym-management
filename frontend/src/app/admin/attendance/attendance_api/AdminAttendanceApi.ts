// RESPONSIBILITY: Owns typed HTTP access for Admin attendance records, summary, and trend queries.
// DATA FLOW: attendance UI state → typed query params → API transport → Zod validation → TanStack Query.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminAttendanceUrlConfig } from '@/app/admin/attendance/admin_attendance_url_config';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint, DateRangeFilter } from '@/app/admin/attendance/attendance_types/AdminAttendanceTypes';
import { adminAttendanceRecordSchema, adminAttendanceSummarySchema, adminAttendanceTrendPointSchema } from '@/app/admin/attendance/attendance_types/AdminAttendanceSchemas';

export interface AdminAttendanceQueryParams {
  page: number;
  limit: number;
  branchId?: string;
  search?: string;
  status?: string;
  dateRange?: DateRangeFilter;
}

function buildQuery(params?: Record<string, string | number | DateRangeFilter | undefined>): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== null && value !== '') query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const fetchAttendanceRecords = async (params: AdminAttendanceQueryParams) =>
  apiFetch<ApiResponse<AdminAttendanceRecord[]>>(`${AdminAttendanceUrlConfig.api.base}${buildQuery(params as unknown as Record<string, string | number | undefined>)}`, { method: 'GET', dataSchema: z.array(adminAttendanceRecordSchema) });

export const fetchAttendanceSummary = async (params: Pick<AdminAttendanceQueryParams, 'branchId' | 'dateRange'>) =>
  apiFetch<ApiResponse<AdminAttendanceSummary>>(`${AdminAttendanceUrlConfig.api.base}/summary${buildQuery(params as unknown as Record<string, string | number | undefined>)}`, { method: 'GET', dataSchema: adminAttendanceSummarySchema });

export const fetchAttendanceTrend = async (params: Pick<AdminAttendanceQueryParams, 'branchId' | 'dateRange'>) =>
  apiFetch<ApiResponse<AdminAttendanceTrendPoint[]>>(`${AdminAttendanceUrlConfig.api.base}/trend${buildQuery(params as unknown as Record<string, string | number | undefined>)}`, { method: 'GET', dataSchema: z.array(adminAttendanceTrendPointSchema) });
