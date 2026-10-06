// RESPONSIBILITY: Owns the Admin HR HTTP contract for staff, payroll, ledger, advances, dues, and performance.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_HR_API } from '@/app/frontend_admin/admin_hr/admin_hr_url_config';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
import type { StaffPerformanceRecord, PerformancePeriod, PerformanceSortKey, PerformanceSortDirection } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPerformanceTypes';
import { staffSchema, payrollSchema, hrSummarySchema, ledgerEntrySchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrPerformanceSchemas';
import { staffPerformanceRecordSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrPerformanceSchemas';

export const AdminHrApi = {
  fetchStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<ApiResponse<{ staff: Staff[]; total: number }>>(`${ADMIN_HR_API.staffBase}${query ? `?${query}` : ''}`, { dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },
  fetchStaffById: async (id: string) => apiFetch<ApiResponse<Staff>>(ADMIN_HR_API.staffGetOne(id), { dataSchema: staffSchema }),
  createStaff: async (body: Partial<Staff>, idempotencyKey: string) => apiFetch<ApiResponse<Staff>>(ADMIN_HR_API.staffBase, { method: 'POST', body: JSON.stringify(body), dataSchema: staffSchema,
      headers: { 'Idempotency-Key': idempotencyKey }
}),
  updateStaff: async (id: string, body: Partial<Staff>, idempotencyKey: string) => apiFetch<ApiResponse<Staff>>(ADMIN_HR_API.staffUpdate(id), { method: 'PATCH', body: JSON.stringify({ id, ...body }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffSchema }),
  deleteStaff: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_HR_API.staffDelete(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  bulkDeactivateStaff: async (ids: string[], idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_HR_API.bulkDeactivate, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.null(),
      headers: { 'Idempotency-Key': idempotencyKey }
}),
  fetchPayrolls: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<ApiResponse<{ payrolls: Payroll[]; total: number }>>(`${ADMIN_HR_API.payrollsBase}${query ? `?${query}` : ''}`, { dataSchema: z.object({ payrolls: z.array(payrollSchema), total: z.number() }) });
  },
  createPayroll: async (body: Partial<Payroll>, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(ADMIN_HR_API.payrollsBase, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),
  updatePayroll: async (id: string, body: Partial<Payroll>, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(ADMIN_HR_API.payrollUpdate(id), { method: 'PATCH', body: JSON.stringify({ id, ...body }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),
  updatePayrollStatus: async (id: string, status: string, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(ADMIN_HR_API.payrollStatusUpdate(id), { method: 'PATCH', body: JSON.stringify({ id, status }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),
  fetchSummary: async (branchId?: string) => apiFetch<ApiResponse<HrSummary>>(`${ADMIN_HR_API.summary}${branchId ? `?branchId=${encodeURIComponent(branchId)}` : ''}`, { dataSchema: hrSummarySchema }),
  fetchLedger: async (staffId: string) => apiFetch<ApiResponse<LedgerEntry[]>>(ADMIN_HR_API.ledger(staffId), { dataSchema: z.array(ledgerEntrySchema) }),
  giveAdvance: async (data: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_HR_API.advances, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  payDue: async (data: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_HR_API.duesPay, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  fetchStaffPerformance: async (period: PerformancePeriod, params?: { search?: string; sortKey?: PerformanceSortKey; sortDir?: PerformanceSortDirection }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value) query.set(key, String(value)); });
    return apiFetch<ApiResponse<StaffPerformanceRecord[]>>(`${ADMIN_HR_API.performance}?${query.toString()}`, { dataSchema: z.array(staffPerformanceRecordSchema) });
  },
};
