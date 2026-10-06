import type { RevenuePeriod } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTypes';
export interface AdminPlansRevenuePeriodSelectorProps {
  period: RevenuePeriod;
  onPeriodChange: (p: RevenuePeriod) => void;
}
