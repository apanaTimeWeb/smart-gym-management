export enum MigrationStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}
export interface ISchemaMigration {
  id: string;
  name: string;
  appliedAt: Date | null;
  status: MigrationStatus;
}
