// RESPONSIBILITY: Owns MSW handlers for the Admin permissions feature.
// DATA FLOW: permissions API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { MOCK_PERMISSIONS_DATA } from '@/app/admin/permissions/permissions_mocks/fixtures/AdminPermissionsMockFixtures';

export const adminPermissionsMockHandlers = [
  http.get('*/admin/permissions/fetchPermissions', ({ request }) => { const url = new URL(request.url); if (url.searchParams.has('consumer')) return; return ok(MOCK_PERMISSIONS_DATA); }),
  http.post('*/admin/permissions/updateRolePermissions', () => ok(null, 'Permissions updated')),
  http.post('*/admin/permissions/updateGymOverride', () => ok(null, 'Gym override updated'))
];
