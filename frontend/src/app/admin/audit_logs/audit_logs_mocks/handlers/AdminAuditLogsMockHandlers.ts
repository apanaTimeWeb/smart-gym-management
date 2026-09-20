// RESPONSIBILITY: Owns MSW handlers for the Admin audit_logs feature.
// DATA FLOW: audit_logs API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_AUDIT_LOGS } from '@/app/admin/audit_logs/audit_logs_mocks/fixtures/AdminAuditLogsMockFixtures';
import type { AuditLog } from '@/app/admin/audit_logs/audit_logs_types/AdminAuditLogsDetailDrawerPropsTypes';

function paged<T>(data: T[], page: number, limit: number) {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const totalPages = Math.max(1, Math.ceil(data.length / safeLimit));
  const start = (safePage - 1) * safeLimit;
  return HttpResponse.json({
    success: true, message: 'Success', data: data.slice(start, start + safeLimit),
    meta: { total: data.length, page: safePage, limit: safeLimit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 },
  });
}

export const adminAuditLogsMockHandlers = [
  http.get('*/admin/audit_logs/fetchLogs', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const severity = url.searchParams.get('severity');
    const moduleName = url.searchParams.get('module');
    const branch = url.searchParams.get('branchId');
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const filtered = MOCK_AUDIT_LOGS.filter((log: AuditLog) => {
      const text = `${log.details} ${log.user} ${log.action} ${log.ip}`.toLowerCase();
      const timestamp = new Date(log.timestamp);
      return (!search || text.includes(search))
        && (!severity || log.severity === severity)
        && (!moduleName || log.module === moduleName)
        && (!branch || branch === 'all' || log.branchId === branch || log.branchId === 'all')
        && (!dateFrom || timestamp >= new Date(dateFrom))
        && (!dateTo || timestamp <= new Date(`${dateTo}T23:59:59Z`));
    });
    return paged(filtered, page, limit);
  }),
  http.get('*/admin/audit_logs/fetchKPIs', () => {
    const totalEvents = MOCK_AUDIT_LOGS.length;
    const highSeverity = MOCK_AUDIT_LOGS.filter((log) => log.severity === 'high').length;
    const mediumSeverity = MOCK_AUDIT_LOGS.filter((log) => log.severity === 'medium').length;
    const lowSeverity = MOCK_AUDIT_LOGS.filter((log) => log.severity === 'low').length;
    const uniqueUsers = new Set(MOCK_AUDIT_LOGS.map((log) => log.user)).size;
    return HttpResponse.json({ success: true, message: 'Success', data: { totalEvents, highSeverity, mediumSeverity, lowSeverity, eventsToday: totalEvents, uniqueUsers } });
  }),
];
