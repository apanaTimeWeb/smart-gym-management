// RESPONSIBILITY: Infrastructure lifecycle enum used only for persistence-row lifecycle state.
// FLOW: Entity status column → TypeORM enum → repository active-row policy.
export enum ManagerCoreRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}
