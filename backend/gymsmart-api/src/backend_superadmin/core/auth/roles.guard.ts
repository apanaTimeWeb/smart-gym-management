// RESPONSIBILITY: Enforces controller-layer RBAC using typed role metadata.
// FLOW: @Roles metadata -> RolesGuard -> request.user.role -> allow/deny.
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '@/backend_superadmin/core/auth/roles.decorator';
import { AuthenticatedUser, SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  /** Verifies that the request actor has a role permitted by the controller. */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<SuperadminRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]) ?? [];
    if (roles.length === 0) return true;
    const request = context.switchToHttp().getRequest<Request & { user?: AuthenticatedUser }>();
    if (!request.user || !roles.includes(request.user.role)) throw new ForbiddenException('Insufficient role');
    return true;
  }
}
