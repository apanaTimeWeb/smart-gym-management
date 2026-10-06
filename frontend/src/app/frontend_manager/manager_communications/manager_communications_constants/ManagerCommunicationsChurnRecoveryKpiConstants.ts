import { UserX, TrendingDown, RotateCcw, Clock } from 'lucide-react';
import { ManagerCommunicationsFormatNumber, ManagerCommunicationsFormatPercent } from '@/app/frontend_manager/manager_communications/manager_communications_utils/ManagerCommunicationsFormatters';
import type { ChurnKPIData } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';


/**
 * @description Provides the ManagerCommunicationsChurnRecoveryKpiConstants implementation for the communications module.
 * @dependencies @/app/frontend_manager/manager_communications/manager_communications_utils/ManagerCommunicationsFormatters; @/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_CHURN_RECOVERY_KPI_CARDS = [
  { key: 'totalChurned' as keyof ChurnKPIData, label: 'TOTAL LOST', icon: UserX, iconBg: 'bg-danger-bg', iconColor: 'text-danger', format: (v: number) => ManagerCommunicationsFormatNumber(v) },
  { key: 'churnedThisMonth' as keyof ChurnKPIData, label: 'LOST THIS MONTH', icon: TrendingDown, iconBg: 'bg-warning-bg', iconColor: 'text-warning', format: (v: number) => ManagerCommunicationsFormatNumber(v) },
  { key: 'recoveryRate' as keyof ChurnKPIData, label: 'RECOVERY RATE', icon: RotateCcw, iconBg: 'bg-success-bg', iconColor: 'text-success', format: (v: number) => ManagerCommunicationsFormatPercent(v) },
  { key: 'avgDaysSinceExit' as keyof ChurnKPIData, label: 'AVG DAYS SINCE EXIT', icon: Clock, iconBg: 'bg-info-bg', iconColor: 'text-info', format: (v: number) => `${v}d` },
] as const;
