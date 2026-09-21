// RESPONSIBILITY: Enforces declarative RBAC metadata at the HTTP controller boundary.
// FLOW: Controller @CoreRoles -> CoreRolesGuard -> verified JWT role -> decision.

import { ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CoreErrorConstants } from '@/core/constants/core-error.constants';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { CORE_ROLES } from '@/core/security/core-roles.decorator';

import type { CoreRoleRequest } from '@/core/security/core-security.interfaces';
import type { CoreJwtClaims } from '@/core/security/core-jwt-claims';
@Injectable()
export class CoreRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /** @description Checks the verified JWT role against controller-declared roles. @param context - Nest execution context. @returns Whether the request may continue. @throws ForbiddenException when the role is not allowed. */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<readonly string[]>(CORE_ROLES, [context.getHandler(), context.getClass()]);
    if (!requiredRoles?.length) return true;

    const request = context.switchToHttp().getRequest<CoreRoleRequest>();
    if (!request.user || !requiredRoles.includes(request.user.role)) throw new ForbiddenException(CoreErrorConstants.MESSAGE.REQUIRED_ROLE_MISSING);
    return true;
  }
}
