// RESPONSIBILITY: Centralized runtime enum/configuration for Manager maintenance.
// FLOW: DTO/entity/query allowlists -> Maintenance feature behavior.

export enum MaintenanceRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const MaintenanceAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum MaintenancePriority { LOW='LOW', MEDIUM='MEDIUM', HIGH='HIGH' }
export { MaintenancePriority as MaintenancePriorityType };

export enum MaintenanceStatus { OPEN='OPEN', IN_PROGRESS='IN_PROGRESS', RESOLVED='RESOLVED' }
