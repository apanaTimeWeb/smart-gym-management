// RESPONSIBILITY: Defines the paginated members repository query contract.
// FLOW: Query DTO → service input → repository filtering/sorting/pagination.

export interface MembersListQuery {
  page: number; limit: number; search?: string; status?: string; progressStatus?: string;
  sortBy: string; sortDirection: string;
}
