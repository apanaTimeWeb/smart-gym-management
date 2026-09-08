// RESPONSIBILITY: TypeScript types for the Trainer Reports module.

export type ReportTabId = 'members' | 'attendance' | 'progress' | 'workout';

export interface TrainerReportTab {
  id: ReportTabId;
  label: string;
}

export interface TrainerReportExportParams {
  type: ReportTabId;
  startDate?: string;
  endDate?: string;
}
