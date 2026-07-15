import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';

@Processor('broadcasts')
export class BroadcastProcessor extends WorkerHost {
  private readonly logger = new Logger(BroadcastProcessor.name);

  constructor(private readonly repository: BroadcastsRepository) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);

    switch (job.name) {
      case 'send-email':
        return this.handleSendEmail(job.data);
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async handleSendEmail(data: { broadcastId: string }) {
    this.logger.log(`Handling send-email for broadcast ${data.broadcastId}`);
    
    // 1. Fetch broadcast
    const broadcast = await this.repository.findById(data.broadcastId);
    if (!broadcast) {
      throw new Error(`Broadcast ${data.broadcastId} not found`);
    }

    // 2. Simulate sending email (in real life, integration with SES/SendGrid would be here)
    this.logger.log(`Sending email to audience: ${broadcast.audience} with subject: ${broadcast.title}`);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 3. Update status to SENT
    await this.repository.update(data.broadcastId, { 
      status: 'SENT' as any,
      sentDate: new Date()
    });
    
    this.logger.log(`Successfully sent broadcast ${data.broadcastId}`);
    return { status: 'success' };
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Job ${job.id} has completed!`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} has failed: ${error.message}`);
  }
}
