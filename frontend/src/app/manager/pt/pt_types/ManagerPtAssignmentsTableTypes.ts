// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { PtAssignment } from '@/app/manager/pt/pt_types/ManagerPtTypes';

export interface ManagerPtAssignmentsTableProps {
  assignments: PtAssignment[];
  totalAssignments?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  markingId: string | null;
  onMarkSession: (id: string) => void;
  isPending?: boolean;
}
