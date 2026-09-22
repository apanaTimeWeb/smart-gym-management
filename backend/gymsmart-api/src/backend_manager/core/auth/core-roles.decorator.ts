// RESPONSIBILITY: Declares controller-layer RBAC metadata using the canonical Roles decorator.
// FLOW: @Roles(...) metadata -> CoreRolesGuard -> trusted actor role -> allow/deny.
import { SetMetadata } from '@nestjs/common';

import { CoreRole } from '@/core/auth/core-role.constants';

export const Roles = (...roles: CoreRole[]) => SetMetadata('core_roles', roles);
