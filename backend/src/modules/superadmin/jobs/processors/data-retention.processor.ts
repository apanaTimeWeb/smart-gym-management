import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';

@Processor('data-retention')
export class DataRetentionProcessor extends WorkerHost {
  private readonly logger = new Logger(DataRetentionProcessor.name);

  constructor(private readonly repository: JobsRepository) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);

    switch (job.name) {
      case 'cleanup-logs':
        return this.handleCleanupLogs(job.data);
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async handleCleanupLogs(data: { days: number }) {
    this.logger.log(`Handling cleanup-logs older than ${data.days} days`);
    
    // Simulate cleanup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    this.logger.log(`Successfully cleaned up logs older than ${data.days} days`);
    return { status: 'success', deletedCount: 150 };
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Data retention job ${job.id} completed successfully.`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Data retention job ${job.id} failed: ${error.message}`);
  }
}
