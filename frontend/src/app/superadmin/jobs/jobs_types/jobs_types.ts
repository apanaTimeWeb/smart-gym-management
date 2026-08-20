export interface BackgroundJob {
  id: string;
  queueName: string;
  jobName: string;
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED' | 'DELAYED';
  attempts: number;
  error?: string;
  createdAt: string;
}

export interface JobsMetrics {
  activeJobs: number;
  completed24h: number;
  failed24h: number;
  delayed: number;
}
