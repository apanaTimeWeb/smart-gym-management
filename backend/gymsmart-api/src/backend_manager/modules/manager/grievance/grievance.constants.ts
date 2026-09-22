// RESPONSIBILITY: Centralized runtime enum/configuration for Manager grievance.
// FLOW: DTO/entity/query allowlists -> Grievance feature behavior.

export enum GrievanceRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const GrievanceAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum GrievanceCategory { DEFAULT = 'DEFAULT' }
