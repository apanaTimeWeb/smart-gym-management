import { UserX, TrendingDown, RotateCcw, Clock } from 'lucide-react';
import { formatNumber, formatPercent } from '@/lib/formatters';
import type { ChurnKPIData } from '@/app/manager/communications/communications_types/ManagerCommunications_types';


export const MANAGER_CHURN_RECOVERY_KPI_CARDS = [
  { key: 'totalChurned' as keyof ChurnKPIData, label: 'TOTAL LOST', icon: UserX, iconBg: 'bg-danger', iconColor: 'text-danger', format: (v: number) => formatNumber(v) },
  { key: 'churnedThisMonth' as keyof ChurnKPIData, label: 'LOST THIS MONTH', icon: TrendingDown, iconBg: 'bg-warning', iconColor: 'text-warning', format: (v: number) => formatNumber(v) },
  { key: 'recoveryRate' as keyof ChurnKPIData, label: 'RECOVERY RATE', icon: RotateCcw, iconBg: 'bg-success', iconColor: 'text-success', format: (v: number) => formatPercent(v) },
  { key: 'avgDaysSinceExit' as keyof ChurnKPIData, label: 'AVG DAYS SINCE EXIT', icon: Clock, iconBg: 'bg-info', iconColor: 'text-info', format: (v: number) => `${v}d` },
] as const;
