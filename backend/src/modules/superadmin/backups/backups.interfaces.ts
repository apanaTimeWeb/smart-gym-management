export enum BackupStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS'
}
export interface IBackupRecord {
  id: string;
  tenantName: string;
  databaseName: string;
  sizeMB: number;
  status: BackupStatus;
  timestamp: Date;
}
