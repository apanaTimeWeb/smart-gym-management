import type { PerformancePeriod } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';
export interface AdminHrPerformancePeriodSelectorProps {
  period: PerformancePeriod;
  onPeriodChange: (p: PerformancePeriod) => void;
}
