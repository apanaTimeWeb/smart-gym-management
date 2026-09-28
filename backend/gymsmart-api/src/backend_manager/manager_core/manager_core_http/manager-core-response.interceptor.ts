// RESPONSIBILITY: Wraps successful controller results and applies role-aware sensitive-field serialization.
// FLOW: Controller result → role policy + endpoint metadata → sanitized data → canonical ApiResponse envelope.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { MANAGER_CORE_EXPOSE_SENSITIVE_FIELDS } from '@/backend_manager/manager_core/manager_core_http/manager-core-sensitive-fields.decorator';

import type { Observable } from 'rxjs';
import type { ApiResponse } from '@/backend_manager/manager_core/manager_core_types/manager-core-api-response.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';
import type { Request } from 'express';

const ROLE_ALLOWED_SENSITIVE_FIELDS: Record<ManagerCoreRole, ReadonlySet<string>> = {
  [ManagerCoreRole.MANAGER]: new Set(['aadhaar', 'medicalHistory', 'medicalNotes', 'bankAccountNumber', 'ifscCode', 'panNumber']),
  [ManagerCoreRole.ADMIN]: new Set(['aadhaar', 'medicalHistory', 'medicalNotes', 'bankAccountNumber', 'ifscCode', 'panNumber']),
  [ManagerCoreRole.STAFF]: new Set(),
};

const ALL_SENSITIVE_FIELDS = new Set([
  'password', 'refreshToken', 'accessToken', 'apiKey', 'secret', 'otp', 'pin', 'cvv', 'cardNumber',
  'bankAccountNumber', 'aadhaar', 'medicalHistory', 'medicalNotes', 'ifscCode', 'panNumber',
]);

@Injectable()
export class ManagerCoreResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector, private readonly requestContext: ManagerCoreRequestContextService) {}

  /**
   * @description Wraps a controller result in the canonical success envelope and serializes sensitive fields according to the authenticated role.
   * @param context - HTTP execution context.
   * @param next - Controller handler.
   * @returns Observable of the canonical response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (this.reflector.getAllAndOverride<boolean>('core_raw_response', [context.getHandler(), context.getClass()])) return next.handle();
    const request = context.switchToHttp().getRequest<Request>();
    const role = this.readRole(request);
    const explicitlyAllowed = new Set<string>(this.reflector.getAllAndOverride<string[]>(MANAGER_CORE_EXPOSE_SENSITIVE_FIELDS, [context.getHandler(), context.getClass()]) ?? []);
    const roleAllowed = role ? ROLE_ALLOWED_SENSITIVE_FIELDS[role] : new Set<string>();
    const allowed = new Set([...explicitlyAllowed].filter((field) => roleAllowed.has(field)));
    return next.handle().pipe(map((result: unknown): ApiResponse<unknown> => {
      const normalized = this.normalizeDomainResult(result);
      const sanitized = this.sanitize(normalized, allowed);
      if (this.hasPaginationEnvelope(sanitized)) return { success: true, message: 'Request completed successfully', data: sanitized.data, meta: sanitized.meta };
      return { success: true, message: 'Request completed successfully', data: sanitized };
    }));
  }

  /** @description Reads the authenticated role from the request context populated by the JWT guard. @param request - Current HTTP request. @returns Authenticated role or undefined. */
  private readRole(request: Request): ManagerCoreRole | undefined {
    void request;
    const role = this.requestContext.get().actorRole;
    return Object.values(ManagerCoreRole).includes(role as ManagerCoreRole) ? role as ManagerCoreRole : undefined;
  }

  /** @description Converts internal ORM-free domain wrappers into the flat API objects consumed by Manager frontend contracts. @param value - Controller result or nested result. @returns Public response shape. */
  private normalizeDomainResult(value: unknown): unknown {
    if (Array.isArray(value)) return value.map((item) => this.normalizeDomainResult(item));
    if (typeof value !== 'object' || value === null) return value;
    const source = value as Record<string, unknown>;
    if (typeof source.id === 'string' && typeof source.payload === 'object' && source.payload !== null && !Array.isArray(source.payload)) {
      return { id: source.id, ...(this.normalizeDomainResult(source.payload) as Record<string, unknown>) };
    }
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(source)) output[key] = this.normalizeDomainResult(item);
    return output;
  }

  /** @description Removes or retains sensitive fields using the endpoint declaration and authenticated role policy. @param value - Response value. @param allowed - Role-authorized sensitive fields. @returns Sanitized response value. */
  private sanitize(value: unknown, allowed: Set<string>): unknown {
    if (Array.isArray(value)) return value.map((item) => this.sanitize(item, allowed));
    if (typeof value !== 'object' || value === null) return value;
    const source = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(source)) {
      if (ALL_SENSITIVE_FIELDS.has(key) && !allowed.has(key)) continue;
      output[key] = this.sanitize(item, allowed);
    }
    return output;
  }

  /** @description Validates the internal paginated-result marker before exposing pagination metadata. @param result - Controller result. @returns True only for canonical pagination shape. */
  private hasPaginationEnvelope(result: unknown): result is { data: unknown; meta: PaginationMeta } {
    if (typeof result !== 'object' || result === null) return false;
    if (!('data' in result) || !('meta' in result)) return false;
    const meta = (result as { meta?: unknown }).meta;
    if (typeof meta !== 'object' || meta === null) return false;
    const value = meta as Record<string, unknown>;
    return ['total', 'page', 'limit', 'totalPages', 'hasNextPage', 'hasPrevPage'].every((key) => key in value);
  }
}
