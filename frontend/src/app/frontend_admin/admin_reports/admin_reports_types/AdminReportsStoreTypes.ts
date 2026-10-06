// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { ReportTab, ReportDateRange } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';
export interface AdminReportsStore {
  activeTab: ReportTab;
  setActiveTab: (tab: ReportTab) => void;
  dateRange: ReportDateRange;
  setDateRange: (range: ReportDateRange) => void;
  startDate: string;
  endDate: string;
  setCustomDateRange: (start: string, end: string) => void;
  selectedGymId: string;
  setSelectedGymId: (id: string) => void;
}
