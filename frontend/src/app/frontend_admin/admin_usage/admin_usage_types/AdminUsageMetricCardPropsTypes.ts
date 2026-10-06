import type { AdminUsageMetric } from '@/app/frontend_admin/admin_usage/admin_usage_types/AdminUsageTypes';
export interface AdminUsageMetricCardProps {
  metric: AdminUsageMetric;
  onUpgrade?: () => void;
}
