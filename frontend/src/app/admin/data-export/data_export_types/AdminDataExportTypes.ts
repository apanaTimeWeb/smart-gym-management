// RESPONSIBILITY: TypeScript types for the Data Export module.

export type ExportFormat = 'csv' | 'excel' | 'pdf';
export type ExportDataType = 'members' | 'payments' | 'attendance' | 'staff' | 'full_report';
export type ExportStatus = 'completed' | 'processing' | 'failed';

export interface ExportJob {
  id: string;
  dataType: ExportDataType;
  format: ExportFormat;
  gymIds: string[];
  gymNames: string[];
  dateFrom: string;
  dateTo: string;
  status: ExportStatus;
  rowCount?: number;
  fileSizeKb?: number;
  createdAt: string;
  completedAt?: string;
  createdBy: string;
}

export interface ExportFormValues {
  dataType: ExportDataType;
  format: ExportFormat;
  gymIds: string[];
  dateFrom: string;
  dateTo: string;
}

export interface DataExportKPIData {
  totalExports: number;
  totalRowsExported: number;
  lastExportDate: string;
  pendingJobs: number;
}
export interface AdminDataExportQueryParams {
  page: number;
  limit: number;
  status?: ExportStatus;
}
