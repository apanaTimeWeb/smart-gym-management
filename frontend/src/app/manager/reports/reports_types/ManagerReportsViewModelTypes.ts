// RESPONSIBILITY: Return type contract for the Manager Reports feature facade.
import type { ReportSummary, ReportTab } from '@/app/manager/reports/reports_types/ManagerReportsTypes';

export interface ManagerReportsViewModel {
  tab: ReportTab;
  setTab: (tab: ReportTab) => void;
  dateRange: string;
  setDateRange: (value: string) => void;
  summary: ReportSummary | null;
  isPending: boolean;
  isError: boolean;
  exporting: boolean;
  handleExportCSV: () => Promise<unknown>;
  reload: () => Promise<void>;
}
