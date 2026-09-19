import type { AdminUsageMetric } from '@/app/admin/usage/usage_types/AdminUsageTypes';
export interface AdminUsageMetricCardProps {
  metric: AdminUsageMetric;
  onUpgrade?: () => void;
}
