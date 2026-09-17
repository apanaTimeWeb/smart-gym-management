// RESPONSIBILITY: Owns mutable MSW handlers for the Admin HR feature.
// DATA FLOW: HR API client → module-owned MSW handler → mutable fixture state → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { MOCK_ADMIN_HR_SUMMARY, MOCK_ADMIN_LEDGER, MOCK_ADMIN_PAYROLLS_EXPANDED, MOCK_ADMIN_STAFF_EXPANDED, MOCK_ADMIN_STAFF_PERFORMANCE } from '@/app/admin/hr/hr_mocks/fixtures/AdminHrMockFixtures';
import type { Payroll, Staff } from '@/app/admin/hr/hr_types/AdminHrTypes';

type JsonObject = Record<string, unknown>;
const clone = <T>(value: T): T => structuredClone(value);
let staffState: Staff[] = clone(MOCK_ADMIN_STAFF_EXPANDED);
let payrollState: Payroll[] = clone(MOCK_ADMIN_PAYROLLS_EXPANDED);

async function parseBody(request: Request): Promise<JsonObject> {
  try { const value: unknown = await request.clone().json(); return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {}; } catch { return {}; }
}
const readString = (input: JsonObject, key: string, fallback = '') => typeof input[key] === 'string' ? input[key] as string : fallback;
const readNumber = (input: JsonObject, key: string, fallback = 0) => Number.isFinite(Number(input[key])) ? Number(input[key]) : fallback;
const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });
const notFound = (message: string) => HttpResponse.json({ success: false, message, data: null }, { status: StatusCodes.NOT_FOUND });

function buildStaff(input: JsonObject): Staff {
  const id = `s-demo-${Date.now()}`;
  return {
    id,
    employeeId: readString(input, 'employeeId', `EMP-DEMO-${Date.now()}`),
    name: readString(input, 'name', 'Demo Staff'),
    email: readString(input, 'email', `staff-${Date.now()}@gym.com`),
    phone: readString(input, 'phone', '9876543200'),
    role: readString(input, 'role', 'Trainer'),
    salary: readNumber(input, 'salary'),
    branch: readString(input, 'branch', 'Downtown Main'),
    gender: readString(input, 'gender', 'Other'),
    joinDate: readString(input, 'joinDate', new Date().toISOString()),
    isActive: input.isActive === undefined ? true : Boolean(input.isActive),
  };
}

function buildPayroll(input: JsonObject): Payroll {
  const amount = readNumber(input, 'amount');
  const paidAmount = readNumber(input, 'paidAmount');
  const pendingAmount = Math.max(0, amount - paidAmount);
  const status = pendingAmount === 0 ? 'PAID' : paidAmount > 0 ? 'PARTIAL' : 'PENDING';
  const staffId = readString(input, 'staffId', '');
  const staff = staffState.find((item) => item.id === staffId);
  return {
    id: `pr-demo-${Date.now()}`,
    staffId,
    month: readString(input, 'month', new Date().toISOString().slice(0, 7)),
    amount,
    paidAmount,
    pendingAmount,
    status: status as Payroll['status'],
    paidAt: paidAmount > 0 ? new Date().toISOString() : undefined,
    staff: staff ? { name: staff.name, role: staff.role } : undefined,
  };
}

export const adminHrMockHandlers = [
  http.get('*/admin/hr/staff', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const branchId = url.searchParams.get('branchId');
    const branchNameById: Record<string, string> = { b1: 'Downtown Main', b2: 'Westside Gym', b3: 'Northside Arena', b4: 'Eastside Fitness' };
    const all = staffState.filter((staff) => (!search || `${staff.name} ${staff.employeeId} ${staff.role}`.toLowerCase().includes(search)) && (!branchId || branchId === 'all' || staff.branch === branchNameById[branchId]));
    return ok({ staff: all, total: all.length });
  }),
  http.get('*/admin/hr/staff/:id', ({ params }) => { const staff = staffState.find((item) => item.id === String(params.id)); return staff ? ok(staff) : notFound('Staff member not found'); }),
  http.post('*/admin/hr/staff', async ({ request }) => { const created = buildStaff(await parseBody(request)); staffState.unshift(created); return ok(created, 'Staff member created'); }),
  http.patch('*/admin/hr/staff/:id', async ({ request, params }) => { const index = staffState.findIndex((item) => item.id === String(params.id)); if (index < 0) return notFound('Staff member not found'); const body = await parseBody(request); staffState[index] = { ...staffState[index]!, ...body, id: staffState[index]!.id } as Staff; return ok(staffState[index], 'Staff member updated'); }),
  http.delete('*/admin/hr/staff/:id', ({ params }) => { const index = staffState.findIndex((item) => item.id === String(params.id)); if (index < 0) return notFound('Staff member not found'); staffState.splice(index, 1); return ok(null, 'Staff member removed'); }),
  http.post('*/admin/hr/staff/bulk-deactivate', async ({ request }) => { const body = await parseBody(request); const ids = Array.isArray(body.ids) ? body.ids.map(String) : []; staffState = staffState.map((staff) => ids.includes(staff.id) ? { ...staff, isActive: false } : staff); return ok(null, 'Staff deactivated'); }),
  http.get('*/admin/hr/payrolls', ({ request }) => { const url = new URL(request.url); const month = url.searchParams.get('month'); const status = url.searchParams.get('status'); const all = payrollState.filter((payroll) => (!month || payroll.month === month) && (!status || status === 'all' || payroll.status === status)); return ok({ payrolls: all, total: all.length }); }),
  http.post('*/admin/hr/payrolls', async ({ request }) => { const created = buildPayroll(await parseBody(request)); payrollState.unshift(created); return ok(created, 'Payroll created'); }),
  http.patch('*/admin/hr/payrolls/:id', async ({ request, params }) => { const index = payrollState.findIndex((item) => item.id === String(params.id)); if (index < 0) return notFound('Payroll record not found'); const body = await parseBody(request); const current = payrollState[index]!; const amount = body.amount === undefined ? current.amount : readNumber(body, 'amount', current.amount); const paidAmount = body.paidAmount === undefined ? current.paidAmount : readNumber(body, 'paidAmount', current.paidAmount); const pendingAmount = Math.max(0, amount - paidAmount); payrollState[index] = { ...current, ...body, id: current.id, amount, paidAmount, pendingAmount, status: pendingAmount === 0 ? 'PAID' : paidAmount > 0 ? 'PARTIAL' : 'PENDING', paidAt: paidAmount > 0 ? (current.paidAt ?? new Date().toISOString()) : undefined } as Payroll; return ok(payrollState[index], 'Payroll updated'); }),
  http.patch('*/admin/hr/payrolls/:id/status', async ({ request, params }) => { const index = payrollState.findIndex((item) => item.id === String(params.id)); if (index < 0) return notFound('Payroll record not found'); const body = await parseBody(request); const status = readString(body, 'status', payrollState[index]!.status); payrollState[index] = { ...payrollState[index]!, status: status as Payroll['status'], ...(status.toLowerCase() === 'paid' ? { paidAmount: payrollState[index]!.amount, pendingAmount: 0, paidAt: new Date().toISOString() } : {}) }; return ok(payrollState[index], 'Payroll status updated'); }),
  http.get('*/admin/hr/summary', () => ok(MOCK_ADMIN_HR_SUMMARY)),
  http.get('*/admin/hr/staff/:id/ledger', ({ params }) => ok(clone(MOCK_ADMIN_LEDGER).filter((entry) => entry.staffId === String(params.id)))),
  http.post('*/admin/hr/advances', () => ok(null, 'Salary advance recorded')),
  http.post('*/admin/hr/dues/pay', () => ok(null, 'Staff due payment recorded')),
  http.get('*/admin/hr/performance', () => ok(MOCK_ADMIN_STAFF_PERFORMANCE)),
  // Preserve the fixture exports as reset/reference data for tests and future mock reset hooks.
  http.head('*/admin/hr/__mock-reset', () => { staffState = clone(MOCK_ADMIN_STAFF_EXPANDED); payrollState = clone(MOCK_ADMIN_PAYROLLS_EXPANDED); return new HttpResponse(null, { status: StatusCodes.NO_CONTENT }); }),
];
