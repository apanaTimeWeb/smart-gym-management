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

export interface MigrationResponse {
  success: boolean;
  message: string;
  data: ISchemaMigration | ISchemaMigration[] | any | null;
}
