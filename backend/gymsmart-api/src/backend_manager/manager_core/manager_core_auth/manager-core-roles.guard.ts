// RESPONSIBILITY: Owns backend core authorization/security guard.
// FLOW: Request context → authentication/authorization decision → allow or reject.
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';

@Injectable()
export class ManagerCoreRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly context: ManagerCoreRequestContextService) {}

  /** @description Enforces declared roles at the controller boundary. @param executionContext - Current execution context. @returns True when actor role is allowed. @throws ForbiddenException when a required role is missing. */
  canActivate(executionContext: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<ManagerCoreRole[]>('core_roles', [executionContext.getHandler(), executionContext.getClass()]) ?? [];
    if (!roles.length) return true;
    const actorRole = this.context.get().actorRole as ManagerCoreRole | undefined;
    if (!actorRole || !roles.includes(actorRole)) throw new ForbiddenException({ errorCode: 'AUTH.ROLE.FORBIDDEN' });
    return true;
  }
}
