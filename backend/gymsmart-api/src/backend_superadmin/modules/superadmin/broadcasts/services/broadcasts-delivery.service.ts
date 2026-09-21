// RESPONSIBILITY: Applies one broadcast recipient delivery result and keeps counts consistent.
// FLOW: delivery command -> broadcast existence -> atomic count update -> response.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.repository';
import { SuperadminBroadcastDeliveryResultDto } from '@/backend_superadmin/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
import { BroadcastsMapper } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.mapper';

@Injectable()
export class BroadcastsDeliveryService {
  constructor(private readonly repository: BroadcastsRepository) {}

  /** Records a deterministic delivery result for a broadcast recipient. */
  async deliver(input: { broadcastId: string; recipientId: string }): Promise<SuperadminBroadcastDeliveryResultDto> {
    const broadcast = await this.repository.findByIdOrThrow(input.broadcastId);
    const deliveredAt = new Date().toISOString();
    await this.repository.recordDelivery(broadcast.id, true);
    return { broadcast: BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(await this.repository.findByIdOrThrow(broadcast.id))), recipientId: input.recipientId, deliveryStatus: 'DELIVERED', deliveredAt };
  }
}
