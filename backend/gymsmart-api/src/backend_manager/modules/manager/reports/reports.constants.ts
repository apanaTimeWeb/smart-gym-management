// RESPONSIBILITY: Centralized runtime enum/configuration for Manager reports.
// FLOW: DTO/entity/query allowlists -> Reports feature behavior.

export enum ReportTab {
  REVENUE = 'Revenue',
  ATTENDANCE = 'Attendance',
  MEMBERS = 'Members',
  EXPENSES = 'Expenses',
}

export enum ExportFormat {
  CSV = 'CSV',
  PDF = 'PDF',
}

export enum ReportsRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const ReportsAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
