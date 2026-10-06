import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_PERMISSIONS, MOCK_ADMIN_PERMISSION_OVERRIDES } from '@/app/frontend_admin/admin_permissions/admin_permissions_mocks/admin_permissions_fixtures/AdminPermissionsMockFixtures';
import type { StaffOverride, UpdateStaffPermissionPayload } from '@/app/frontend_admin/admin_permissions/admin_permissions_types/AdminPermissionsTypes';

let permissionsState = structuredClone(MOCK_ADMIN_PERMISSIONS);
let overridesState = structuredClone(MOCK_ADMIN_PERMISSION_OVERRIDES);
const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data });
const parse = async (request: Request): Promise<unknown> => { try { return await request.clone().json(); } catch { return undefined; } };

export const adminPermissionsMockHandlers = [
  http.get('*/admin/permissions', () => ok(permissionsState)),
  http.get('*/admin/permissions/overrides', () => ok(overridesState)),
  http.patch('*/admin/permissions/:staffId', async ({ params, request }) => {
    const staffId = String(params.staffId ?? '');
    const body = (await parse(request)) as Partial<UpdateStaffPermissionPayload> | undefined;
    const permission = String(body?.permission ?? '');
    const enabled = Boolean(body?.enabled);
    const current = overridesState.find((item) => item.staffId === staffId);
    if (!current || !permission) return HttpResponse.json({ success: false, message: 'Staff override not found', data: null }, { status: StatusCodes.NOT_FOUND });
    const next: StaffOverride = { ...current, overrides: { ...current.overrides, [permission]: enabled } };
    overridesState = overridesState.map((item) => item.staffId === staffId ? next : item);
    return ok(next, 'Permission updated');
  }),
  http.post('*/admin/permissions/:staffId/reset', ({ params }) => {
    const staffId = String(params.staffId ?? '');
    const current = overridesState.find((item) => item.staffId === staffId);
    if (!current) return HttpResponse.json({ success: false, message: 'Staff override not found', data: null }, { status: StatusCodes.NOT_FOUND });
    overridesState = overridesState.filter((item) => item.staffId !== staffId);
    return ok(null, 'Permissions reset to role defaults');
  }),
];
