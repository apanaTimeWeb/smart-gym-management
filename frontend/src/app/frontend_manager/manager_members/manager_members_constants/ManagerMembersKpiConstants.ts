import { User, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { ManagerMembersKpiKey } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';


/**
 * @description Provides the ManagerMembersKpiConstants implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_MEMBERS_KPI_CONFIG: ReadonlyArray<{
  label: string; key: ManagerMembersKpiKey; color: string; bg: string; icon: typeof User;
}> = [
  { label: 'Total Members', key: 'total', color: 'text-info', bg: 'bg-info-bg', icon: User },
  { label: 'Active', key: 'active', color: 'text-success', bg: 'bg-success-bg', icon: CheckCircle },
  { label: 'Pending', key: 'pending', color: 'text-warning', bg: 'bg-warning-bg', icon: Clock },
  { label: 'Expired', key: 'expired', color: 'text-danger', bg: 'bg-danger-bg', icon: XCircle },
];
