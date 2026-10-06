import type { PerformancePeriod } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPerformanceTypes';
export interface AdminHrPerformancePeriodSelectorProps {
  period: PerformancePeriod;
  onPeriodChange: (p: PerformancePeriod) => void;
}
