// RESPONSIBILITY: Wraps every successful controller result in the canonical ApiResponse envelope.
// FLOW: Controller result -> ResponseInterceptor -> { success, message, data, meta }.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '@/backend_superadmin/core/types/api-response.types';
import { PaginatedResult } from '@/backend_superadmin/core/pagination/paginated-result';
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  /** Converts controller return values into the canonical success envelope. */
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    return next.handle().pipe(map((result: T) => {
      const maybe = result as T & Partial<PaginatedResult<unknown>>;
      if (maybe && Array.isArray((maybe as Partial<PaginatedResult<unknown>>).data) && (maybe as Partial<PaginatedResult<unknown>>).meta) {
        return { success: true, message: 'Request successful', data: (maybe as unknown as PaginatedResult<unknown>).data as T, meta: (maybe as unknown as PaginatedResult<unknown>).meta } as ApiResponse<T>;
      }
      return { success: true, message: 'Request successful', data: result };
    }));
  }
}
