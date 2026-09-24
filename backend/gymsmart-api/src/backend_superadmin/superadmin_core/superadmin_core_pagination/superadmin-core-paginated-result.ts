// RESPONSIBILITY: Marks a service result as a paginated response payload before the global interceptor adds the canonical envelope metadata.
// FLOW: List service -> SuperadminPaginatedResult -> SuperadminCoreResponseInterceptor -> ApiResponse.
import type { SuperadminPaginationMeta } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination.utils';
/**
 * Primary Intent: Defines SuperadminPaginatedResult as the interface-level contract for superadmin-core-paginated-result.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminPaginatedResult<T> { data: T[]; meta: SuperadminPaginationMeta; }
