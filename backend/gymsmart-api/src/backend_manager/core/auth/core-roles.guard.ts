// RESPONSIBILITY: Enforces controller-layer RBAC from trusted request context; no inline service authorization rules.
// FLOW: @Roles metadata -> trusted actor role -> allow/deny.
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CoreRole } from '@/core/auth/core-role.constants';
import { CoreRequestContextService } from '@/core/context/core-request-context.service';

@Injectable()
export class CoreRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly context: CoreRequestContextService) {}

  /** @description Enforces declared roles at the controller boundary. @param executionContext - Current execution context. @returns True when actor role is allowed. @throws ForbiddenException when a required role is missing. */
  canActivate(executionContext: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<CoreRole[]>('core_roles', [executionContext.getHandler(), executionContext.getClass()]) ?? [];
    if (!roles.length) return true;
    const actorRole = this.context.get().actorRole as CoreRole | undefined;
    if (!actorRole || !roles.includes(actorRole)) throw new ForbiddenException({ errorCode: 'AUTH.ROLE.FORBIDDEN' });
    return true;
  }
}
