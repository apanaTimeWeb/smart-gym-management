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
  HttpResponse.json({ success: true, message, data });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 } });
};


export const adminAuditLogsMockHandlers = [
  http.get('*/admin/audit_logs/fetchLogs', ({ request }) => { const url = new URL(request.url); const search=(url.searchParams.get('search')??'').toLowerCase(); const severity=url.searchParams.get('severity'); const module=url.searchParams.get('module'); const branch=url.searchParams.get('branchId'); const dateFrom=url.searchParams.get('dateFrom'); const dateTo=url.searchParams.get('dateTo'); const page=Math.max(1,Number(url.searchParams.get('page'))||1); const limit=Math.max(1,Number(url.searchParams.get('limit'))||10); const filtered=[].filter((log: any)=>{const text=`${log.details} ${log.user} ${log.action} ${log.ip}`.toLowerCase(); const ts=new Date(log.timestamp); return (!search||text.includes(search))&&(!severity||log.severity===severity)&&(!module||log.module===module)&&(!branch||branch==='all'||log.branchId===branch||log.branchId==='all')&&(!dateFrom||ts>=new Date(dateFrom))&&(!dateTo||ts<=new Date(`${dateTo}T23:59:59Z`));}); return paged(filtered,page,limit); }),
  http.get('*/admin/audit_logs/fetchKPIs', () => ok({}))
];
