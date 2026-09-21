// RESPONSIBILITY: Defines Auth controller request shapes without leaking Express types into domain contracts.
// FLOW: HTTP request -> Auth command/query controller -> verified Core JWT claims.

import type { Request } from 'express';

import type { CoreJwtClaims } from '@/backend_auth/core/security/core-jwt-claims';

export type AuthRequest = Request & { user?: CoreJwtClaims };
export type AuthQueryRequest = Request & { user?: CoreJwtClaims };
