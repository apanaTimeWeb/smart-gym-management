// RESPONSIBILITY: Owns MSW handlers for the Admin settings feature.
// DATA FLOW: settings API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_SETTINGS } from '@/app/admin/settings/settings_mocks/fixtures/AdminSettingsMockFixtures';
import { MOCK_ADMIN_SETTINGS_ROLE_PERMISSIONS } from '@/app/admin/settings/settings_mocks/fixtures/AdminSettingsMockFixtures';

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


export const adminSettingsMockHandlers = [
  http.get('*/admin/permissions/fetchPermissions', ({ request }) => { const url = new URL(request.url); if (url.searchParams.get('consumer') !== 'settings') return; return HttpResponse.json({ success: true, message: 'Success', data: { roleDefaults: MOCK_ADMIN_SETTINGS_ROLE_PERMISSIONS, gymOverrides: [] }, meta: { total: 1, page: 1, limit: 50, totalPages: 1 } }); }),
  http.get('*/admin/settings/fetchSettings', () => ok(MOCK_ADMIN_SETTINGS)),
  http.post('*/admin/settings/updateSettings', () => ok(MOCK_ADMIN_SETTINGS, 'Settings updated'))
];
