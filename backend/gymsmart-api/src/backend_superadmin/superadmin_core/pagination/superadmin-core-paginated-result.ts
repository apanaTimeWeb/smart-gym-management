// RESPONSIBILITY: Marks a service result as a paginated response payload before the global interceptor adds the canonical envelope metadata.
// FLOW: List service -> SuperadminPaginatedResult -> SuperadminResponseInterceptor -> ApiResponse.
import type { SuperadminPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
export interface SuperadminPaginatedResult<T> { data: T[]; meta: SuperadminPaginationMeta; }
