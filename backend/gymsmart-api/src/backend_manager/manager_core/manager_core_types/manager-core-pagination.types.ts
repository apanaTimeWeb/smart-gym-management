// RESPONSIBILITY: Canonical pagination metadata contract shared by all paginated Manager API responses.
// FLOW: Repository count/page/limit -> buildPaginationMeta() -> ApiResponse.meta.
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
