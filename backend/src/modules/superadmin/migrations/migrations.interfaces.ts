export type MigrationStatus = 'PENDING' | 'SUCCESS' | 'FAILED';
export interface ISchemaMigration {
  id: string;
  name: string;
  appliedAt: Date | null;
  status: MigrationStatus;
}
