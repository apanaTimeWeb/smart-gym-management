// RESPONSIBILITY: Applies one broadcast recipient delivery result and keeps counts consistent.
// FLOW: delivery command -> broadcast existence -> atomic count update -> response.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.repository';
import { SuperadminBroadcastDeliveryResultDto } from '@/backend_superadmin/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
import { UnitOfWorkService } from '@/backend_superadmin/core/database/unit-of-work.service';
import { BroadcastsMapper } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.mapper';

@Injectable()
export class BroadcastsDeliveryService {
  constructor(private readonly repository: BroadcastsRepository, private readonly unitOfWork: UnitOfWorkService) {}

  /** Records a deterministic delivery result for a broadcast recipient. */
  async deliver(input: { broadcastId: string; recipientId: string }): Promise<SuperadminBroadcastDeliveryResultDto> {
    const deliveredAt = new Date().toISOString();
    const broadcast = await this.unitOfWork.run(async () => {
      const row = await this.repository.findByIdOrThrow(input.broadcastId);
      await this.repository.recordDeliveryWithLock(row.id, true);
      return this.repository.findByIdOrThrow(row.id);
    });
    return { broadcast: BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(broadcast)), recipientId: input.recipientId, deliveryStatus: 'DELIVERED', deliveredAt };
  }
}