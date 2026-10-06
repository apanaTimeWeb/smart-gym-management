// RESPONSIBILITY: Defines the zero-business pagination contract used by Admin data-table primitives.
export interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}
