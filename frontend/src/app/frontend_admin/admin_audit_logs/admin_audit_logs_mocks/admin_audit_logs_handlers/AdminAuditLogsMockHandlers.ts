// RESPONSIBILITY: Owns module-scoped MSW handlers for the documented immutable Audit Logs API.
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { MOCK_AUDIT_ACTORS, MOCK_AUDIT_KPI, MOCK_AUDIT_LOGS } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_mocks/admin_audit_logs_fixtures/AdminAuditLogsMockFixtures';
import type { AuditLogDetail } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_types/AdminAuditLogsTypes';

function page<T>(items: T[], pageNumber: number, limit: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / limit));
  const safePage = Math.max(1, Math.min(pageNumber, totalPages));
  const start = (safePage - 1) * limit;
  return { success: true, message: 'Success', data: items.slice(start, start + limit), meta: { total: items.length, page: safePage, limit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 } };
}

export const adminAuditLogsMockHandlers = [
  http.get('*/admin/audit-logs', ({ request }) => {
    const url = new URL(request.url);
    const actor = url.searchParams.get('actor');
    const action = url.searchParams.get('action');
    const entityType = url.searchParams.get('entityType');
    const entityId = url.searchParams.get('entityId');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const pageNumber = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const items = MOCK_AUDIT_LOGS.filter((log) => {
      const date = new Date(log.timestamp).getTime();
      return (!actor || actor === 'all' || log.actor === actor) && (!action || log.action.includes(action)) && (!entityType || entityType === 'all' || log.entityType === entityType) && (!entityId || entityId === 'all' || log.entityId === entityId) && (!from || date >= new Date(from).getTime()) && (!to || date <= new Date(`${to}T23:59:59.999Z`).getTime());
    });
    return HttpResponse.json(page(items, pageNumber, limit));
  }),
  http.get('*/admin/audit-logs/kpis', () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_AUDIT_KPI })),
  http.get('*/admin/audit-logs/actors', () => HttpResponse.json({ success: true, message: 'Success', data: { actors: MOCK_AUDIT_ACTORS } })),
  http.get('*/admin/audit-logs/:id', ({ params }) => {
    const record = MOCK_AUDIT_LOGS.find((log) => log.id === params.id) as AuditLogDetail | undefined;
    if (!record) return HttpResponse.json({ success: false, message: 'Audit log not found.', data: null, error: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND }, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Success', data: record });
  }),
  http.get('*/admin/audit-logs/export', ({ request }) => {
    const url = new URL(request.url);
    const actor = url.searchParams.get('actor');
    const action = url.searchParams.get('action');
    const entityType = url.searchParams.get('entityType');
    const filtered = MOCK_AUDIT_LOGS.filter((log) => (!actor || actor === 'all' || log.actor === actor) && (!action || log.action.includes(action)) && (!entityType || entityType === 'all' || log.entityType === entityType));
    const header = 'timestamp,actor,action,entityType,entityId,branchId,severity,details';
    const rows = filtered.map((log) => [log.timestamp, log.actor, log.action, log.entityType, log.entityId ?? '', log.branchId, log.severity, log.details.replaceAll('"', '""')].map((value) => `"${value}"`).join(','));
    return new HttpResponse([header, ...rows].join('\n'), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="audit_logs.csv"' } });
  }),
];
