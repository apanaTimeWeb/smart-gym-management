// RESPONSIBILITY: TypeScript types for the Admin Data Export module.

export type ExportFormat = 'csv' | 'excel' | 'pdf';
export type ExportDataType = 'members' | 'payments' | 'attendance' | 'staff' | 'full_report';
export type ExportStatus = 'completed' | 'processing' | 'failed';
export type DataExportSortKey = 'dataType' | 'format' | 'dateFrom' | 'rowCount' | 'fileSizeKb' | 'status' | 'createdAt';
export type DataExportSortDirection = 'asc' | 'desc';

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
  status?: ExportStatus | 'all';
  sortKey?: DataExportSortKey;
  sortDir?: DataExportSortDirection;
}

export interface AdminDataExportHistoryProps {
  jobs: ExportJob[];
  status: 'pending' | 'error' | 'success';
  statusFilter: ExportStatus | 'all';
  setStatusFilter: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  sortKey: DataExportSortKey;
  sortDir: DataExportSortDirection;
  onSort: (key: DataExportSortKey) => void;
  deleteJob: (id: string) => void;
}
