// RESPONSIBILITY: Defines controller-level RBAC metadata for protected endpoints.
// FLOW: @Roles -> SuperadminRolesGuard -> SuperadminAuthenticatedUser.role.
import { SetMetadata } from '@nestjs/common';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: SuperadminRole[]) => SetMetadata(ROLES_KEY, roles);