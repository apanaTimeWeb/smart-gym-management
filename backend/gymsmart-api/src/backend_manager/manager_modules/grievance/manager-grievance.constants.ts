// RESPONSIBILITY: Centralized runtime enum/configuration for Manager grievance.
// FLOW: DTO/entity/query allowlists -> Grievance feature behavior.

export enum GrievanceRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const GrievanceAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum GrievanceCategory { HYGIENE='HYGIENE', STAFF_BEHAVIOUR='STAFF_BEHAVIOUR', EQUIPMENT='EQUIPMENT', OTHER='OTHER' }
export { GrievanceCategory as GrievanceCategoryType };

export enum GrievanceStatus { OPEN='OPEN', RESOLVING='RESOLVING', CLOSED='CLOSED' }
