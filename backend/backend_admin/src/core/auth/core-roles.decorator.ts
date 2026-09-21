// RESPONSIBILITY: Declares required typed roles for Admin controller endpoints.
// FLOW: @CoreRoles() metadata → CoreRolesGuard → controller authorization.

import { SetMetadata } from '@nestjs/common';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';

export const CORE_ROLES_KEY = 'core_roles';
export const CoreRoles = (...roles: CoreAdminRole[]) => SetMetadata(CORE_ROLES_KEY, roles);
