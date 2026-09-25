// RESPONSIBILITY: Owns Admin reports finite-domain enums used by DTO validation and business flows.
// FLOW: AdminReportsMutationDto → AdminReports constants → Admin reports command service.

export enum AdminReportsTab {
  REVENUE = 'revenue',
  MEMBERSHIP = 'membership',
  ATTENDANCE = 'attendance',
  PAYROLL = 'payroll',
  PNL = 'pnl',
}

export enum AdminReportsFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
}

export enum AdminReportsStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
