// RESPONSIBILITY: Defines the only allowed pagination metadata shape for paginated API responses.
// FLOW: Repository count -> buildPaginationMeta -> response envelope meta.

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
