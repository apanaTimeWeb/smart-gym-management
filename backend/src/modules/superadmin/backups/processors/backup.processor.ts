import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';

@Processor('backups')
export class BackupProcessor extends WorkerHost {
  private readonly logger = new Logger(BackupProcessor.name);

  constructor(private readonly repository: BackupsRepository) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);

    switch (job.name) {
      case 'dump-database':
        return this.handleDumpDatabase(job.data);
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async handleDumpDatabase(data: { backupId: string }) {
    this.logger.log(`Handling dump-database for backup ${data.backupId}`);
    
    // 1. Fetch backup record
    const backup = await this.repository.findById(data.backupId);
    if (!backup) {
      throw new Error(`Backup ${data.backupId} not found`);
    }

    this.logger.log(`Dumping database: ${backup.databaseName} for tenant: ${backup.tenantName}`);
    
    // 2. Simulate running pg_dump
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const randomSizeMB = parseFloat((Math.random() * (100 - 10) + 10).toFixed(2));

    // 3. Update status to SUCCESS
    await this.repository.update(data.backupId, { 
      status: 'SUCCESS' as any,
      sizeMB: randomSizeMB
    });
    
    this.logger.log(`Successfully completed backup ${data.backupId} with size ${randomSizeMB} MB`);
    return { status: 'success', sizeMB: randomSizeMB };
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Backup job ${job.id} completed successfully.`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Backup job ${job.id} failed: ${error.message}`);
  }
}
