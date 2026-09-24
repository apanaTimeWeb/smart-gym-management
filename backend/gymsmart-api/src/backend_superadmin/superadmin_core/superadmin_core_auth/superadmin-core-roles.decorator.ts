// RESPONSIBILITY: Defines controller-level RBAC metadata for protected endpoints.
// FLOW: @Roles -> SuperadminCoreRolesGuard -> SuperadminAuthenticatedUser.role.
import { SetMetadata } from '@nestjs/common';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: SuperadminRole[]) => SetMetadata(ROLES_KEY, roles);
