export interface IBackupRecord {
  id: string;
  tenantName: string;
  databaseName: string;
  sizeMB: number;
  status: 'SUCCESS' | 'IN_PROGRESS' | 'FAILED';
  timestamp: string;
}

export interface IBackupListResponse {
  data: IBackupRecord[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
