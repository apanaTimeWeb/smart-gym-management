// RESPONSIBILITY: Centralized runtime enum/configuration for Manager dashboard.
// FLOW: DTO/entity/query allowlists -> Dashboard feature behavior.

export enum TimeRange {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  CUSTOM = 'custom',
}

export enum ManagerDashboardDateField {
  STARTDATE = 'startDate',
  ENDDATE = 'endDate',
}

export enum DashboardRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const DashboardAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
