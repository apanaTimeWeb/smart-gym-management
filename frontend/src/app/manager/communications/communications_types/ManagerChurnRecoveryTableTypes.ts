// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnedMember } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

export interface ManagerChurnRecoveryTableProps {
  members: ChurnedMember[];
  allFilteredCount: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string | null;
  churnSearch: string;
  onSearchChange: (s: string) => void;
  churnReasonFilter: string;
  onReasonFilterChange: (r: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onOpenComposer: (memberId: string) => void;
}
