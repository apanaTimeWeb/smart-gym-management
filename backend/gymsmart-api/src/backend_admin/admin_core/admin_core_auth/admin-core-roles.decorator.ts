// RESPONSIBILITY: Declares required typed roles for Admin controller endpoints.
// FLOW: @AdminCoreRoles() metadata â†’ AdminCoreRolesGuard â†’ controller authorization.
import { SetMetadata } from '@nestjs/common';

import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

export const CORE_ROLES_KEY = 'core_roles';
export const AdminCoreRoles = (...roles: AdminCoreAdminRole[]) => SetMetadata(CORE_ROLES_KEY, roles);
