export type JobStatus = 'ACTIVE' | 'COMPLETED' | 'FAILED' | 'DELAYED';
export interface IBackgroundJob {
  id: string;
  queueName: string;
  jobName: string;
  status: JobStatus;
  attempts: number;
  error: string | null;
  createdAt: Date;
}
