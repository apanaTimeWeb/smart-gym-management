import type { RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
export interface AdminPlansRevenuePeriodSelectorProps {
  period: RevenuePeriod;
  onPeriodChange: (p: RevenuePeriod) => void;
}
