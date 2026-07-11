import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class SendBroadcastsService {
  private readonly logger = new Logger(SendBroadcastsService.name);

  constructor(@InjectQueue('broadcasts') private readonly queue: Queue) {}

  async execute(id: string) {
    this.logger.log(`Sending broadcast ${id}`);
    
    await this.queue.add('send-email', { broadcastId: id });
    this.logger.log(`Job enqueued for broadcast ${id} via BullMQ`);
    
    return { success: true, message: 'Broadcast queued for sending', data: { id, status: 'QUEUED', sentAt: new Date() } };
  }
}
