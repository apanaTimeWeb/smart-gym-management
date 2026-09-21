// RESPONSIBILITY: Defines request shapes used only at the core security/controller boundary.
// FLOW: Express request -> CoreJwtAuthGuard/CoreRolesGuard -> typed security request contract.

import type { Request } from 'express';

import type { CoreJwtClaims } from '@/backend_auth/core/security/core-jwt-claims';

export type CoreAuthenticatedRequest = Request & { user?: CoreJwtClaims };
export type CoreRoleRequest = Request & { user?: CoreJwtClaims };
