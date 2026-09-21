// RESPONSIBILITY: Defines controller-level RBAC metadata for protected endpoints.
// FLOW: @Roles -> RolesGuard -> AuthenticatedUser.role.
import { SetMetadata } from '@nestjs/common';
import { SuperadminRole } from '@/core/auth/auth.types';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: SuperadminRole[]) => SetMetadata(ROLES_KEY, roles);
