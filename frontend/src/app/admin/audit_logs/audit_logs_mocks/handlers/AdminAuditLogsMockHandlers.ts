// RESPONSIBILITY: Owns MSW handlers for the Admin audit_logs feature.
// DATA FLOW: audit_logs API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)) } });
};

import { MOCK_AUDIT_KPI, MOCK_AUDIT_LOGS } from '@/app/admin/audit_logs/audit_logs_mocks/fixtures/AdminAuditLogsMockFixtures';

export const adminAuditLogsMockHandlers = [
  http.get('*/admin/audit_logs/fetchLogs', () => ok(MOCK_AUDIT_LOGS)),
  http.get('*/admin/audit_logs/fetchKPIs', () => ok(MOCK_AUDIT_KPI))
];
