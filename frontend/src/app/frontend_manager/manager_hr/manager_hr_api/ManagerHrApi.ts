import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { staffSchema, payrollSchema, hrSummarySchema, ledgerEntrySchema } from '@/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrSchema';
import { ManagerHrUrlConfig } from '@/app/frontend_manager/manager_hr/manager_hr_url_config';
import type { ManagerHrStaffAttendanceRecord } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrStaffAttendanceTypes';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerHrApi implementation for the hr module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_hr/manager_hr_schemas/ManagerHrSchema; @/app/frontend_manager/manager_hr/manager_hr_url_config; @/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrStaffAttendanceTypes; @/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerHrApi = {
  fetchStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: Staff[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.STAFF_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },
  fetchStaffById: async (id: string): Promise<ApiResponse<Staff>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.STAFF_GET_ONE(id), { dataSchema: staffSchema });
  },
  createStaff: async (body: Partial<Staff> & { joinDate?: string | Date }, idempotencyKey: string): Promise<ApiResponse<Staff>> => {
    const serializedBody = { ...body, ...(body.joinDate ? { joinDate: body.joinDate instanceof Date ? body.joinDate.toISOString() : body.joinDate } : {}) };
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.STAFF_BASE, { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffSchema });
  },
  updateStaff: async (id: string, body: Partial<Staff> & { joinDate?: string | Date }, idempotencyKey: string): Promise<ApiResponse<Staff>> => {
    const serializedBody = { ...body, ...(body.joinDate ? { joinDate: body.joinDate instanceof Date ? body.joinDate.toISOString() : body.joinDate } : {}) };
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.STAFF_GET_ONE(id), { method: 'PATCH', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffSchema });
  },
  deleteStaff: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.STAFF_GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) });
  },
  fetchPayrolls: async (params?: Record<string, string>): Promise<ApiResponse<{ payrolls: Payroll[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.PAYROLLS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ payrolls: z.array(payrollSchema), total: z.number() }) });
  },
  generatePayrolls: async (month: string, idempotencyKey: string): Promise<ApiResponse<{ payrolls: Payroll[] }>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.PAYROLL_GENERATE, { method: 'POST', body: JSON.stringify({ month }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ payrolls: z.array(payrollSchema) }) });
  },
  createPayroll: async (body: Partial<Payroll> & { paidAt?: string | Date }, idempotencyKey: string): Promise<ApiResponse<Payroll>> => {
    const serializedBody = { ...body, ...(body.paidAt ? { paidAt: body.paidAt instanceof Date ? body.paidAt.toISOString() : body.paidAt } : {}) };
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.PAYROLL_CREATE, { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema });
  },
  updatePayroll: async (id: string, body: Partial<Payroll> & { paidAt?: string | Date }, idempotencyKey: string): Promise<ApiResponse<Payroll>> => {
    const serializedBody = { ...body, ...(body.paidAt ? { paidAt: body.paidAt instanceof Date ? body.paidAt.toISOString() : body.paidAt } : {}) };
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.PAYROLL_UPDATE(id), { method: 'PATCH', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema });
  },
  updatePayrollStatus: async (id: string, status: string, idempotencyKey: string): Promise<ApiResponse<Payroll>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.PAYROLL_STATUS_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ status }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema });
  },
  fetchHrSummary: async (): Promise<ApiResponse<HrSummary>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.SUMMARY, { dataSchema: hrSummarySchema });
  },
  fetchLedger: async (staffId: string): Promise<ApiResponse<{ ledger: LedgerEntry[]; total: number }>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.LEDGER(staffId), { dataSchema: z.object({ ledger: z.array(ledgerEntrySchema), total: z.number() }) });
  },
  giveStaffAdvance: async (data: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<{ advanceAmount: number }>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.LEDGER_ADVANCE, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ advanceAmount: z.number() }) });
  },
  payStaffDue: async (data: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<{ paidAmount: number }>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.LEDGER_PAY_DUE, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ paidAmount: z.number() }) });
  },
  fetchStaffAttendance: async (staffId: string, month: string): Promise<ApiResponse<{ history: ManagerHrStaffAttendanceRecord[] }>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.STAFF_ATTENDANCE(staffId, month), { dataSchema: z.object({ history: z.array(z.object({ date: z.string(), checkIn: z.string().optional(), checkOut: z.string().optional(), status: z.string().optional() }).passthrough()) }) });
  } };
