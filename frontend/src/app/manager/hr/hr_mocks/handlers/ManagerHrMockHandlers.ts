import { http, HttpResponse } from 'msw';
import { MOCK_STAFF, MOCK_PAYROLLS, MOCK_HR_SUMMARY, MOCK_LEDGER } from '@/app/manager/hr/hr_fixtures/ManagerHrMockData';
import { ManagerHrUrlConfig } from '@/app/manager/hr/hr_url_config';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import type { Staff, Payroll } from '@/app/manager/hr/hr_types/ManagerHrTypes';


let mockStaff = [...MOCK_STAFF];
let mockPayrolls = [...MOCK_PAYROLLS];
let mockLedger = [...MOCK_LEDGER];

let mockStaffIdCounter = 1000;
let mockPayrollIdCounter = 1000;

export function resetManagerHrMockState(): void {
  mockStaff = [...MOCK_STAFF];
  mockPayrolls = [...MOCK_PAYROLLS];
  mockLedger = [...MOCK_LEDGER];
  mockStaffIdCounter = 1000;
  mockPayrollIdCounter = 1000;
}

export const managerHrHandlers = [
  http.get(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.STAFF_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const role = (url.searchParams.get('role') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const filtered = mockStaff.filter((staff) => {
      const matchesSearch = !search || [staff.name, staff.email, staff.phone].join(' ').toLowerCase().includes(search);
      const matchesRole = !role || role === 'all' || (staff.role || '').toLowerCase().includes(role);
      return matchesSearch && matchesRole;
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Success', data: { staff: filtered.slice(start, start + limit), total: filtered.length, page, limit } });
  }),

  http.get(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.STAFF_GET_ONE(':id')), ({ params }) => {
    const staff = mockStaff.find(s => s.id === params.id) || mockStaff[0];
    return HttpResponse.json({ success: true, message: 'Success', data: staff });
  }),

  http.post(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.STAFF_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Staff>;
    const newStaff = { ...mockStaff[0], ...body, id: `stf-${mockStaffIdCounter++}` } as Staff;
    mockStaff = [newStaff, ...mockStaff];
    return HttpResponse.json({ success: true, message: 'Created', data: newStaff });
  }),

  http.patch(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.STAFF_GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Staff>;
    const idx = mockStaff.findIndex(s => s.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockStaff[idx] = { ...mockStaff[idx], ...body } as Staff;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockStaff[idx] });
  }),

  http.delete(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.STAFF_GET_ONE(':id')), ({ params }) => {
    mockStaff = mockStaff.filter(s => s.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),

  http.get(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.PAYROLLS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const month = url.searchParams.get('month') || '';
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const filtered = mockPayrolls.filter((payroll) => {
      const searchText = [payroll.staff?.name, payroll.staff?.role, payroll.id].filter(Boolean).join(' ').toLowerCase();
      const matchesSearch = !search || searchText.includes(search);
      const matchesMonth = !month || payroll.month === month || payroll.month === new Date(`${month}-01T00:00:00Z`).toLocaleString('en-US', { month: 'long', year: 'numeric' });
      return matchesSearch && matchesMonth;
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Success', data: { payrolls: filtered.slice(start, start + limit), total: filtered.length, page, limit } });
  }),

  http.post(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.PAYROLL_GENERATE), async ({ request }) => {
    const { month } = await request.json() as { month: string };
    const existingForMonth = new Set(mockPayrolls.filter((item) => item.month === month).map((item) => item.staffId));
    const generated = mockStaff.filter((item) => item.isActive && !existingForMonth.has(item.id)).map((item, index) => ({
      id: `pay-${mockPayrollIdCounter++}-${index}`, staffId: item.id, month, amount: item.salary, netPayable: item.salary, paidAmount: 0, pendingAmount: item.salary, status: 'PENDING', deductions: { tds: 0, pf: 0, esi: 0, other: 0 }, staff: { name: item.name, role: item.role } } as Payroll));
    mockPayrolls = [...generated, ...mockPayrolls];
    return HttpResponse.json({ success: true, message: 'Payroll generated.', data: { payrolls: generated } });
  }),

  http.post(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.PAYROLLS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Payroll>;
    const newPayroll = { ...mockPayrolls[0], ...body, id: `pay-${mockPayrollIdCounter++}` } as Payroll;
    mockPayrolls = [newPayroll, ...mockPayrolls];
    return HttpResponse.json({ success: true, message: 'Created', data: newPayroll });
  }),

  http.patch(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.PAYROLL_GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Payroll>;
    const idx = mockPayrolls.findIndex(p => p.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockPayrolls[idx] = { ...mockPayrolls[idx], ...body } as Payroll;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPayrolls[idx] });
  }),

  http.patch(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.PAYROLL_STATUS_UPDATE(':id')), async ({ request, params }) => {
    const { status } = await request.json() as { status: string };
    const idx = mockPayrolls.findIndex(p => p.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockPayrolls[idx] = { ...mockPayrolls[idx], status } as Payroll;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPayrolls[idx] });
  }),

  http.get(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.SUMMARY), () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_HR_SUMMARY });
  }),

  http.get(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.LEDGER(':staffId')), () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { ledger: mockLedger, total: mockLedger.length } });
  }),

  http.post(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.LEDGER_ADVANCE), async ({ request }) => {
    const data = await request.json() as Record<string, unknown>;
    const amount = Number(data.amount ?? 0);
    const staffId = String(data.staffId ?? '');
    const currentBalance = mockLedger.filter((entry) => entry.staffId === staffId).reduce((balance, entry) => balance + entry.credit - entry.debit, 0);
    mockLedger = [{ id: `ledger-advance-${Date.now()}`, staffId, date: new Date().toISOString(), type: 'Advance Given', credit: 0, debit: amount, balance: currentBalance - amount, notes: String(data.notes ?? ''), paymentMode: String(data.paymentMode ?? '') }, ...mockLedger];
    return HttpResponse.json({ success: true, message: 'Advance recorded', data: { advanceAmount: amount } });
  }),

  http.post(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.LEDGER_PAY_DUE), async ({ request }) => {
    const data = await request.json() as Record<string, unknown>;
    const amount = Number(data.amount ?? 0);
    const staffId = String(data.staffId ?? '');
    const currentBalance = mockLedger.filter((entry) => entry.staffId === staffId).reduce((balance, entry) => balance + entry.credit - entry.debit, 0);
    mockLedger = [{ id: `ledger-due-${Date.now()}`, staffId, date: new Date().toISOString(), type: 'Due Paid', credit: 0, debit: amount, balance: currentBalance - amount, notes: String(data.notes ?? ''), paymentMode: String(data.paymentMode ?? '') }, ...mockLedger];
    return HttpResponse.json({ success: true, message: 'Due payment recorded', data: { paidAmount: amount } });
  }),
  
  http.get(managerMockApiUrl(ManagerHrUrlConfig.BACKEND_API.STAFF_ATTENDANCE_BASE(':staffId')), ({ request }) => {
    const _month = new URL(request.url).searchParams.get('month');
    return HttpResponse.json({ 
      success: true, 
      message: 'Success', 
      data: { 
        history: [
          { date: '2024-05-01', status: 'Present', checkIn: '08:00 AM', checkOut: '05:00 PM' },
          { date: '2024-05-02', status: 'Present', checkIn: '08:15 AM', checkOut: '05:05 PM' },
          { date: '2024-05-03', status: 'Absent' },
          { date: '2024-05-04', status: 'Leave' }
        ] 
      } 
    });
  }),
];
