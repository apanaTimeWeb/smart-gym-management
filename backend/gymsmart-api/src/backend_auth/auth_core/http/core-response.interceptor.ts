// RESPONSIBILITY: Wraps successful JSON controller results in the canonical API response envelope.
// FLOW: Controller return -> CoreResponseInterceptor -> ApiResponse<T> -> HTTP response.

import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { CoreErrorConstants } from '@/backend_auth/auth_core/constants/core-error.constants';

import type { ApiResponse } from '@/backend_auth/auth_core/auth_types/api-response.types';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
@Injectable()
export class CoreResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  /** @description Wraps controller data in the canonical success envelope. @param _context - Nest execution context. @param next - Downstream handler. @returns Canonical response observable. */
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    return next.handle().pipe(map((data) => ({ success: true, message: CoreErrorConstants.MESSAGE.SUCCESS, data })));
  }
}
