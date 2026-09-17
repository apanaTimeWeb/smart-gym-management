import { http, HttpResponse, delay } from 'msw';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SYSTEM_TENANTS, MOCK_SYSTEM_AUDIT_LOGS } from '@/app/superadmin/system/system_mocks/fixtures/SuperadminSystemMockFixtures';
const BASE_URL = '*/superadmin/system-health';
const MIGRATIONS_URL = '*/superadmin/system/migrations';
const AUDIT_URL = '*/superadmin/audit-logs';
const SLA_CREDIT_URL = '*/superadmin/system/sla/credit';
const mockSlaRecords = [
  { id: 't1', name: 'Flex Fitness Central', targetSla: 99.9, actualUptime: 99.95, downtimeMinutes: 20, downtimeIncidents: 1, status: 'MET' },
  { id: 't2', name: 'Iron Temple Barbell Club', targetSla: 99.9, actualUptime: 99.5, downtimeMinutes: 216, downtimeIncidents: 3, status: 'BREACHED' },
  { id: 't3', name: 'Downtown Fit', targetSla: 99.9, actualUptime: 99.91, downtimeMinutes: 38, downtimeIncidents: 2, status: 'WARNING' },
  { id: 't4', name: 'Zenith Fitness', targetSla: 99.9, actualUptime: 99.97, downtimeMinutes: 10, downtimeIncidents: 1, status: 'MET' },
  { id: 't5', name: 'Peak Performance', targetSla: 99.9, actualUptime: 99.82, downtimeMinutes: 70, downtimeIncidents: 4, status: 'WARNING' },
];
export const superadminSystemHandlers = [
  http.get(BASE_URL, async ({ request }) => {
    await delay(250); const search = new URL(request.url).searchParams.get('search')?.toLowerCase() || '';
    const filtered = search ? mockSlaRecords.filter((r) => r.name.toLowerCase().includes(search)) : mockSlaRecords;
    return HttpResponse.json<ApiResponse<typeof mockSlaRecords>>({ success: true, message: 'Success', data: filtered, meta: { total: filtered.length, page: 1, limit: filtered.length, totalPages: 1 } });
  }),
  http.post(SLA_CREDIT_URL, async ({ request }) => { const body = await request.json() as { tenantId?: string }; const tenantId = body.tenantId ?? ''; return HttpResponse.json({ success: true, message: 'Downtime credit invoice generated', data: { invoiceId: `credit-${Date.now()}`, tenantId, amount: 1000, currency: 'INR' } }); }),
  http.get(`${BASE_URL}/health`, async () => HttpResponse.json({ success: true, message: 'Success', data: { status: 'healthy', timestamp: '2026-09-16T00:00:00Z', checks: { database: 'healthy', api: 'healthy', cache: 'healthy' } } })),
  http.get(MIGRATIONS_URL, async () => HttpResponse.json<ApiResponse<{ tenants: typeof MOCK_SYSTEM_TENANTS }>>({ success: true, message: 'Success', data: { tenants: [...MOCK_SYSTEM_TENANTS] } })),
  http.post(`${MIGRATIONS_URL}/trigger`, async ({ request }) => {
    const body = await request.json() as { tenantId?: string }; const tenantId = body.tenantId;
    return HttpResponse.json<ApiResponse<null>>({ success: true, message: `Migration started for ${tenantId ?? 'tenant'}`, data: null });
  }),
  http.get(AUDIT_URL, async ({ request }) => {
    const url = new URL(request.url); const page = Number(url.searchParams.get('page') || '1'); const limit = Number(url.searchParams.get('limit') || '10'); const search = (url.searchParams.get('search') || '').toLowerCase();
    const filtered = search ? MOCK_SYSTEM_AUDIT_LOGS.filter((l) => `${l.targetResource} ${l.actorName} ${l.actorRole} ${l.action}`.toLowerCase().includes(search)) : MOCK_SYSTEM_AUDIT_LOGS;
    const data = filtered.slice((page - 1) * limit, page * limit); const total = filtered.length;
    return HttpResponse.json<ApiResponse<typeof data>>({ success: true, message: 'Success', data, meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) } });
  }),
];
