// RESPONSIBILITY: Infrastructure lifecycle enum used only for persistence-row lifecycle state.
// FLOW: Entity status column → TypeORM enum → repository active-row policy.
export enum CoreRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}
