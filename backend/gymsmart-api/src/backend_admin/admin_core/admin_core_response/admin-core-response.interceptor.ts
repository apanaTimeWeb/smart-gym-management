// RESPONSIBILITY: Wraps successful controller returns in the single canonical ApiResponse envelope and lifts pagination metadata.
// FLOW: Controller return â†’ AdminCoreResponseInterceptor â†’ ApiResponse<T> with data/meta.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@Injectable()
/**
 * @description Defines the AdminCoreResponseInterceptor boundary for the admin_core_response backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((payload: unknown) => {
        if (payload instanceof StreamableFile || Buffer.isBuffer(payload)) return payload;
        if (this.isPaginated(payload)) {
          return { success: true, message: 'Success', data: payload.items, meta: payload.meta };
        }
        if (payload && typeof payload === 'object' && 'success' in payload && 'data' in payload) {
          return payload;
        }
        return { success: true, message: 'Success', data: payload ?? null };
      }),
    );
  }

  private isPaginated(payload: unknown): payload is AdminCorePaginatedResult<unknown> {
    if (!payload || typeof payload !== 'object') return false;
    const value = payload as Record<string, unknown>;
    return Array.isArray(value.items) && this.isPaginationMeta(value.meta);
  }

  private isPaginationMeta(value: unknown): boolean {
    if (!value || typeof value !== 'object') return false;
    const meta = value as Record<string, unknown>;
    return typeof meta.total === 'number' && typeof meta.page === 'number' && typeof meta.limit === 'number';
  }
}
