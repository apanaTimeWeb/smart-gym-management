import { User, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { ManagerMembersKpiKey } from '@/app/manager/members/members_types/ManagerMembersTypes';


export const MANAGER_MEMBERS_KPI_CONFIG: ReadonlyArray<{
  label: string; key: ManagerMembersKpiKey; color: string; bg: string; icon: typeof User;
}> = [
  { label: 'Total Members', key: 'total', color: 'text-info', bg: 'bg-info', icon: User },
  { label: 'Active', key: 'active', color: 'text-success', bg: 'bg-success', icon: CheckCircle },
  { label: 'Pending', key: 'pending', color: 'text-warning', bg: 'bg-warning', icon: Clock },
  { label: 'Expired', key: 'expired', color: 'text-danger', bg: 'bg-danger', icon: XCircle },
];
