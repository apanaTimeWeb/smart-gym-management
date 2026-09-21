// RESPONSIBILITY: Applies one broadcast recipient delivery result and keeps counts consistent.
// FLOW: delivery command -> broadcast existence -> atomic count update -> response.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';

@Injectable()
export class BroadcastsDeliveryService {
  constructor(private readonly repository: BroadcastsRepository) {}

  /** Records a deterministic delivery result for a broadcast recipient. */
  async deliver(input: { broadcastId: string; recipientId: string }): Promise<{ broadcast: unknown; recipientId: string; deliveryStatus: 'DELIVERED'; deliveredAt: string }> {
    const broadcast = await this.repository.findByIdOrThrow(input.broadcastId);
    const deliveredAt = new Date().toISOString();
    await this.repository.recordDelivery(broadcast.id, true);
    return { broadcast: await this.repository.findByIdOrThrow(broadcast.id), recipientId: input.recipientId, deliveryStatus: 'DELIVERED', deliveredAt };
  }
}
