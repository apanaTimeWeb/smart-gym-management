// RESPONSIBILITY: Centralized constants, mock data, and Zod schema for the Data Export module.
import type { ExportJob, DataExportKPIData } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';

export const DATA_TYPE_OPTIONS = [
  { value: 'members', label: 'Members' },
  { value: 'payments', label: 'Payments' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'staff', label: 'Staff' },
  { value: 'full_report', label: 'Full Report' },
];

export const FORMAT_OPTIONS = [
  { value: 'csv', label: 'CSV' },
  { value: 'excel', label: 'Excel (.xlsx)' },
  { value: 'pdf', label: 'PDF' },
];

export const GYM_OPTIONS = [
  { value: 'all', label: 'All Gyms' },
  { value: 'g1', label: 'Andheri East' },
  { value: 'g2', label: 'Bandra West' },
  { value: 'g3', label: 'Powai' },
  { value: 'g4', label: 'Thane' },
];

export const EXPORT_STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'processing', label: 'Processing' },
  { value: 'failed', label: 'Failed' },
];

export const DATA_EXPORT_ITEMS_PER_PAGE = 10;



export const EMPTY_EXPORT_FORM = {
  dataType: 'members' as const,
  format: 'csv' as const,
  gymIds: ['all'],
  dateFrom: '',
  dateTo: '',
};
