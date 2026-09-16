import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_utils/ManagerHttpStatus';
import { MOCK_STAFF, MOCK_PAYROLLS, MOCK_HR_SUMMARY, MOCK_LEDGER } from '@/app/manager/hr/hr_fixtures/ManagerHrMockData';
import type { Staff, Payroll } from '@/app/manager/hr/hr_types/ManagerHrTypes';

let mockStaff = [...MOCK_STAFF];
let mockPayrolls = [...MOCK_PAYROLLS];
let mockLedger = [...MOCK_LEDGER];

export const managerHrHandlers = [
  http.get('http://localhost:5000/api/v1/manager/hr/staff', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { staff: mockStaff, total: mockStaff.length } });
  }),

  http.get('http://localhost:5000/api/v1/manager/hr/staff/:id', ({ params }) => {
    const staff = mockStaff.find(s => s.id === params.id) || mockStaff[0];
    return HttpResponse.json({ success: true, message: 'Success', data: staff });
  }),

  http.post('http://localhost:5000/api/v1/manager/hr/staff', async ({ request }) => {
    const body = await request.json() as Partial<Staff>;
    const newStaff = { ...mockStaff[0], ...body, id: `stf-${Date.now()}` } as Staff;
    mockStaff = [newStaff, ...mockStaff];
    return HttpResponse.json({ success: true, message: 'Created', data: newStaff });
  }),

  http.patch('http://localhost:5000/api/v1/manager/hr/staff/:id', async ({ request, params }) => {
    const body = await request.json() as Partial<Staff>;
    const idx = mockStaff.findIndex(s => s.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockStaff[idx] = { ...mockStaff[idx], ...body } as Staff;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockStaff[idx] });
  }),

  http.delete('http://localhost:5000/api/v1/manager/hr/staff/:id', ({ params }) => {
    mockStaff = mockStaff.filter(s => s.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),

  http.get('http://localhost:5000/api/v1/manager/hr/payrolls', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { payrolls: mockPayrolls, total: mockPayrolls.length } });
  }),

  http.post('http://localhost:5000/api/v1/manager/hr/payrolls/generate', async ({ request }) => {
    const { month } = await request.json() as { month: string };
    const existingForMonth = new Set(mockPayrolls.filter((item) => item.month === month).map((item) => item.staffId));
    const generated = mockStaff.filter((item) => item.isActive && !existingForMonth.has(item.id)).map((item, index) => ({
      id: `pay-${Date.now()}-${index}`, staffId: item.id, month, amount: item.salary, netPayable: item.salary, paidAmount: 0, pendingAmount: item.salary, status: 'PENDING', deductions: { tds: 0, pf: 0, esi: 0, other: 0 }, staff: { name: item.name, role: item.role },
    } as Payroll));
    mockPayrolls = [...generated, ...mockPayrolls];
    return HttpResponse.json({ success: true, message: 'Payroll generated.', data: { payrolls: generated } });
  }),

  http.post('http://localhost:5000/api/v1/manager/hr/payrolls', async ({ request }) => {
    const body = await request.json() as Partial<Payroll>;
    const newPayroll = { ...mockPayrolls[0], ...body, id: `pay-${Date.now()}` } as Payroll;
    mockPayrolls = [newPayroll, ...mockPayrolls];
    return HttpResponse.json({ success: true, message: 'Created', data: newPayroll });
  }),

  http.patch('http://localhost:5000/api/v1/manager/hr/payrolls/:id', async ({ request, params }) => {
    const body = await request.json() as Partial<Payroll>;
    const idx = mockPayrolls.findIndex(p => p.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockPayrolls[idx] = { ...mockPayrolls[idx], ...body } as Payroll;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPayrolls[idx] });
  }),

  http.patch('http://localhost:5000/api/v1/manager/hr/payrolls/:id/status', async ({ request, params }) => {
    const { status } = await request.json() as { status: string };
    const idx = mockPayrolls.findIndex(p => p.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockPayrolls[idx] = { ...mockPayrolls[idx], status } as Payroll;
    return HttpResponse.json({ success: true, message: 'Updated', data: mockPayrolls[idx] });
  }),

  http.get('http://localhost:5000/api/v1/manager/hr/summary', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_HR_SUMMARY });
  }),

  http.get('http://localhost:5000/api/v1/manager/hr/ledger/:staffId', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { ledger: mockLedger, total: mockLedger.length } });
  }),

  http.post('http://localhost:5000/api/v1/manager/hr/ledger/advance', async ({ request }) => {
    const data = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ success: true, message: 'Success', data: { advanceAmount: data.amount } });
  }),

  http.post('http://localhost:5000/api/v1/manager/hr/ledger/paydue', async ({ request }) => {
    const data = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ success: true, message: 'Success', data: { paidAmount: data.amount } });
  }),
  
  http.get('http://localhost:5000/api/v1/manager/hr/staff/:staffId/attendance', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { history: [] } });
  }),
];
