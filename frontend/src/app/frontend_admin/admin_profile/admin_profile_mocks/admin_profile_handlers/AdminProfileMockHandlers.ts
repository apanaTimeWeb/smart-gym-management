// RESPONSIBILITY: Owns MSW handlers for the Admin profile feature.
// DATA FLOW: profile API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

import type { AdminProfileJsonObject } from '@/app/frontend_admin/admin_profile/admin_profile_types/AdminProfileMockHandlerTypes';
/**
 * parseRequestBody is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

/**
 * asRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function asRecord(value: unknown): AdminProfileJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminProfileJsonObject : {};
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

import { MOCK_ADMIN_PROFILE } from '@/app/frontend_admin/admin_profile/admin_profile_mocks/admin_profile_fixtures/AdminProfileMockFixtures';
import type { AdminProfileData } from '@/app/frontend_admin/admin_profile/admin_profile_types/AdminProfileTypes';
let profileState: AdminProfileData = structuredClone(MOCK_ADMIN_PROFILE);

export const adminProfileMockHandlers = [
  http.get('*/admin/adminProfile/fetchProfile', () => ok(profileState)),
  http.post('*/admin/adminProfile/updateProfile', async ({ request }) => { const raw = await parseRequestBody(request); const body = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string, unknown> : {}; profileState = { ...profileState, ...(body as Partial<AdminProfileData>) }; return ok(profileState, 'Profile updated'); }),
  http.post('*/admin/adminProfile/updatePassword', () => ok(null, 'Password updated'))
];
