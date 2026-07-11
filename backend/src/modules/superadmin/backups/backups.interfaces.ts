export type BackupStatus = 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
export interface IBackupRecord {
  id: string;
  tenantName: string;
  databaseName: string;
  sizeMB: number;
  status: BackupStatus;
  timestamp: Date;
}
