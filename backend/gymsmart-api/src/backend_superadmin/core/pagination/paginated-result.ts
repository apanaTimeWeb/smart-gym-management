// RESPONSIBILITY: Marks a service result as a paginated response payload before the global interceptor adds the canonical envelope metadata.
// FLOW: List service -> PaginatedResult -> ResponseInterceptor -> ApiResponse.
import type { PaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
export interface PaginatedResult<T> { data: T[]; meta: PaginationMeta; }
