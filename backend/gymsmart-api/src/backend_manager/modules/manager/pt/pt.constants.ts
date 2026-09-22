// RESPONSIBILITY: Centralized runtime enum/configuration for Manager pt.
// FLOW: DTO/entity/query allowlists -> Pt feature behavior.

export enum PtSessionStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  MISSED = 'MISSED',
}

export enum PtPaymentStatus {
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  PENDING = 'PENDING',
}

export enum PtActiveTab {
  DASHBOARD = 'dashboard',
  ASSIGNMENTS = 'assignments',
  PACKAGES = 'packages',
  WORKLOAD = 'workload',
}

export enum PtRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const PtAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
