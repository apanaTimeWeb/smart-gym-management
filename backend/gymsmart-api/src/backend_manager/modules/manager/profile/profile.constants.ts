// RESPONSIBILITY: Centralized runtime enum/configuration for Manager profile.
// FLOW: DTO/entity/query allowlists -> Profile feature behavior.

export enum ManagerProfileTab {
  PERSONAL = 'personal',
  SECURITY = 'security',
}

export enum ProfileRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const ProfileAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
