// RESPONSIBILITY: Wraps successful controller returns in the single canonical ApiResponse envelope and lifts pagination metadata.
// FLOW: Controller return â†’ CoreResponseInterceptor â†’ ApiResponse<T> with data/meta.

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { CorePaginatedResult } from '@/backend_admin/core/types/core-api-response.types';

@Injectable()
export class CoreResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((payload: unknown) => {
        if (payload && typeof payload === 'object' && 'success' in payload && 'data' in payload && 'message' in payload) {
          return payload as any;
        }
        if (this.isPaginated(payload)) {
          return { success: true, message: 'Success', data: payload.items, meta: payload.meta };
        }
        return { success: true, message: 'Success', data: payload ?? null };
      }),
    );
  }

  private isPaginated(payload: unknown): payload is CorePaginatedResult<unknown> {
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
