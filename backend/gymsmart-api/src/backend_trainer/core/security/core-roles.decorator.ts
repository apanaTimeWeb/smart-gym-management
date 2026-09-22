// RESPONSIBILITY: Defines controller-layer RBAC metadata using typed role IDs.
// FLOW: Controller @Roles() metadata → CoreRolesGuard → actor role check.


import { SetMetadata } from '@nestjs/common';
import type { CoreRole } from '@/backend_trainer/core/types/core-auth.types';
export const CORE_ROLES_KEY = 'core_roles';
export const CoreRoles = (...roles: CoreRole[]) => SetMetadata(CORE_ROLES_KEY, roles);
