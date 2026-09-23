// RESPONSIBILITY: Centralized runtime enum/configuration for Manager sales.
// FLOW: DTO/entity/query allowlists -> Sales feature behavior.

export enum SalesRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const SalesAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
