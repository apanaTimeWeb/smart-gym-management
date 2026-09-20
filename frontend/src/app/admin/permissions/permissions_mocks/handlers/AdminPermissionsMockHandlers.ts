import { StatusCodes } from 'http-status-codes';
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
  HttpResponse.json({ success: true, message, data });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 } });
};

import { MOCK_PERMISSIONS_DATA } from '@/app/admin/permissions/permissions_mocks/fixtures/AdminPermissionsMockFixtures';
import type { PermissionsData, RoleType } from '@/app/admin/permissions/permissions_types/AdminPermissionsTypes';

let permissionsState: PermissionsData = structuredClone(MOCK_PERMISSIONS_DATA);

export const adminPermissionsMockHandlers = [
  http.get('*/admin/permissions/fetchPermissions', ({ request }) => { const url = new URL(request.url); if (url.searchParams.has('consumer')) return; return ok(permissionsState); }),
  http.post('*/admin/permissions/updateRolePermissions', async ({ request }) => { const body = asRecord(await parseRequestBody(request)); const role = String(body.role) as RoleType; const permissions = body.permissions && typeof body.permissions === 'object' && !Array.isArray(body.permissions) ? body.permissions as Record<string, boolean> : {}; const index = permissionsState.roleDefaults.findIndex((item) => item.role === role); if (index < 0) return HttpResponse.json({ success: false, message: 'Role not found', data: null }, { status: StatusCodes.NOT_FOUND }); permissionsState.roleDefaults[index] = { ...permissionsState.roleDefaults[index]!, permissions }; return ok(permissionsState, 'Permissions updated'); }),
  http.post('*/admin/permissions/updateGymOverride', async ({ request }) => { const body = asRecord(await parseRequestBody(request)); const gymId = String(body.gymId); const role = String(body.role) as RoleType; const overrides = body.overrides && typeof body.overrides === 'object' && !Array.isArray(body.overrides) ? body.overrides as Record<string, boolean> : {}; const index = permissionsState.gymOverrides.findIndex((item) => item.gymId === gymId && item.role === role); if (index < 0) { permissionsState.gymOverrides.push({ gymId, gymName: gymId, role, overrides }); } else { permissionsState.gymOverrides[index] = { ...permissionsState.gymOverrides[index]!, overrides }; } return ok(permissionsState, 'Gym override updated'); })
];
