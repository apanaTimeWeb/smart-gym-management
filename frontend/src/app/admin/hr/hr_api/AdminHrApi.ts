// RESPONSIBILITY: Owns the Admin HR HTTP contract for staff, payroll, ledger, advances, dues, and performance.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminHrUrlConfig } from '@/app/admin/hr/admin_hr_url_config';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { StaffPerformanceRecord, PerformancePeriod, PerformanceSortKey, PerformanceSortDirection } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';
import { staffSchema, payrollSchema, hrSummarySchema, ledgerEntrySchema } from '@/app/admin/hr/hr_types/AdminHrSchemas';
import { staffPerformanceRecordSchema } from '@/app/admin/hr/hr_types/AdminHrPerformanceSchemas';

export const hrApi = {
  fetchStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<ApiResponse<{ staff: Staff[]; total: number }>>(`${AdminHrUrlConfig.BACKEND_API.STAFF_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },
  fetchStaffById: async (id: string) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_GET_ONE(id), { dataSchema: staffSchema }),
  createStaff: async (body: Partial<Staff>) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: staffSchema }),
  updateStaff: async (id: string, body: Partial<Staff>, idempotencyKey?: string) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, ...body }), headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: staffSchema }),
  deleteStaff: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.STAFF_DELETE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  bulkDeactivateStaff: async (ids: string[]) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.BULK_DEACTIVATE, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.null() }),
  fetchPayrolls: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<ApiResponse<{ payrolls: Payroll[]; total: number }>>(`${AdminHrUrlConfig.BACKEND_API.PAYROLLS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ payrolls: z.array(payrollSchema), total: z.number() }) });
  },
  createPayroll: async (body: Partial<Payroll>, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLLS_BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),
  updatePayroll: async (id: string, body: Partial<Payroll>, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLL_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, ...body }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),
  updatePayrollStatus: async (id: string, status: string, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLL_STATUS_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, status }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),
  fetchSummary: async (branchId?: string) => apiFetch<ApiResponse<HrSummary>>(`${AdminHrUrlConfig.BACKEND_API.SUMMARY}${branchId ? `?branchId=${encodeURIComponent(branchId)}` : ''}`, { dataSchema: hrSummarySchema }),
  fetchLedger: async (staffId: string) => apiFetch<ApiResponse<LedgerEntry[]>>(`${AdminHrUrlConfig.BACKEND_API.STAFF_GET_ONE(staffId)}/ledger`, { dataSchema: z.array(ledgerEntrySchema) }),
  giveAdvance: async (data: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.ADVANCES, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  payDue: async (data: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.DUES_PAY, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  fetchStaffPerformance: async (period: PerformancePeriod, params?: { search?: string; sortKey?: PerformanceSortKey; sortDir?: PerformanceSortDirection }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value) query.set(key, String(value)); });
    return apiFetch<ApiResponse<StaffPerformanceRecord[]>>(`${AdminHrUrlConfig.BACKEND_API.PERFORMANCE}?${query.toString()}`, { dataSchema: z.array(staffPerformanceRecordSchema) });
  },
};
