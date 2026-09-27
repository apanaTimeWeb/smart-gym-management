// RESPONSIBILITY: Enforces explicit resource-level authorization before Manager controller execution.
// FLOW: Controller resource metadata → trusted tenant/branch context → feature authorization provider → controller.
import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { MANAGER_CORE_RESOURCE_AUTHORIZATION } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import type { Request } from 'express';

@Injectable()
export class ManagerCoreResourceAuthorizationGuard implements CanActivate {
  constructor(private readonly moduleRef: ModuleRef, private readonly registry: ManagerCoreResourceAuthorizationRegistry, private readonly reflector: Reflector) {}

  /**
   * @description Protects only explicitly annotated feature-resource route parameters and avoids interpreting foreign lookup IDs as feature resources.
   * @param executionContext - Current HTTP execution context.
   * @returns True when access is approved or no resource annotation is present.
   */
  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const request = executionContext.switchToHttp().getRequest<Request>();
    const metadata = this.reflector.getAllAndOverride<{ source: 'params' | 'body' | 'query'; field: string; resourceFeature?: string } | undefined>(MANAGER_CORE_RESOURCE_AUTHORIZATION, [executionContext.getHandler(), executionContext.getClass()]);
    if (!metadata) return true;
    const resourceSpec = metadata;
    const source = resourceSpec.source === 'body' ? request.body : resourceSpec.source === 'query' ? request.query : request.params;
    const resourceId = source?.[resourceSpec.field];
    if (!resourceId) return true;
    const feature = resourceSpec.resourceFeature ?? this.featureFromPath(request.route?.path ?? request.path);
    if (!feature) return true;
    const token = `CORE_RESOURCE_AUTHORIZER:${feature}`;
    const registered = this.registry.get(feature) ?? this.moduleRef.get(token, { strict: false });
    if (!registered) throw new InternalServerErrorException({ errorCode: 'AUTH.RESOURCE_AUTHORIZER.MISSING' });
    await registered.assertCanAccess(resourceId);
    return true;
  }

  /** @description Extracts the feature segment from a Manager route template. @param path - Route template. @returns Feature name or undefined. */
  private featureFromPath(path: string): string | undefined {
    const parts = path.replace(/^\//, '').split('/');
    const managerIndex = parts.indexOf('manager');
    return managerIndex >= 0 ? parts[managerIndex + 1] : undefined;
  }
}
