// RESPONSIBILITY: Owns MSW handlers for the Admin profile feature.
// DATA FLOW: profile API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
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

import { MOCK_ADMIN_PROFILE } from '@/app/admin/profile/profile_mocks/fixtures/AdminProfileMockFixtures';

export const adminProfileMockHandlers = [
  http.get('*/admin/adminProfile/fetchProfile', () => ok(MOCK_ADMIN_PROFILE)),
  http.post('*/admin/adminProfile/updateProfile', () => ok(MOCK_ADMIN_PROFILE, 'Profile updated')),
  http.post('*/admin/adminProfile/updatePassword', () => ok(null, 'Password updated'))
];
