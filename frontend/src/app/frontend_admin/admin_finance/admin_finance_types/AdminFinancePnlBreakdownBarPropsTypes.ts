import type { AdminProgressBarVariant } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/admin_layout_progress_bar_types/AdminLayoutProgressBarTypes';

export interface AdminFinancePnlBreakdownBarProps {
  value: number;
  max: number;
  colorClass: AdminProgressBarVariant;
}
