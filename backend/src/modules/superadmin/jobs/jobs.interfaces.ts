export enum JobStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DELAYED = 'DELAYED'
}
export interface IBackgroundJob {
  id: string;
  queueName: string;
  jobName: string;
  status: JobStatus;
  attempts: number;
  error: string | null;
  createdAt: Date;
}
