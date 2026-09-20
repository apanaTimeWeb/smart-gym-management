// RESPONSIBILITY: Owns the typed props contract for the paginated progress table.
import type { ProgressEntry, ProgressSortDirection, ProgressSortField } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';

export interface TrainerProgressTableProps {
  entries: ProgressEntry[];
  totalEntries: number;
  currentPage: number;
  itemsPerPage: number;
  sortBy: ProgressSortField;
  sortDirection: ProgressSortDirection;
  onPageChange: (page: number) => void;
  onSort: (field: ProgressSortField) => void;
  onEdit: (entry: ProgressEntry) => void;
  onDelete: (entryId: string) => void;
}
