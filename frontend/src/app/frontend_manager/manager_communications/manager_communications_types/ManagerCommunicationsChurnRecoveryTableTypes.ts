// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnedMember } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';

export interface ManagerCommunicationsChurnRecoveryTableProps {
  members: ChurnedMember[];
  allFilteredCount: number;
  isPending: boolean;
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
