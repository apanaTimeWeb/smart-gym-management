// RESPONSIBILITY: Centralized runtime enum/configuration for Manager plans.
// FLOW: DTO/entity/query allowlists -> Plans feature behavior.

export enum PlansRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const PlansAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
