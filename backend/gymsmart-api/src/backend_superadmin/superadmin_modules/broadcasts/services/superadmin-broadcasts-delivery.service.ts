// RESPONSIBILITY: Applies one broadcast recipient delivery result and keeps counts consistent.
// FLOW: delivery command -> broadcast existence -> atomic count update -> response.
import { Injectable } from '@nestjs/common';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastDeliveryResultDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';
import { SuperadminUnitOfWorkService } from '@/backend_superadmin/superadmin_core/database/superadmin-core-unit-of-work.service';
import { SuperadminBroadcastsMapper } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.mapper';

@Injectable()
export class SuperadminBroadcastsDeliveryService {
  constructor(private readonly repository: SuperadminBroadcastsRepository, private readonly unitOfWork: SuperadminUnitOfWorkService) {}

  /** Records a deterministic delivery result for a broadcast recipient. */
  async deliver(input: { broadcastId: string; recipientId: string }): Promise<SuperadminBroadcastDeliveryResultDto> {
    const deliveredAt = new Date().toISOString();
    const broadcast = await this.unitOfWork.run(async () => {
      const row = await this.repository.findByIdOrThrow(input.broadcastId);
      await this.repository.recordDeliveryWithLock(row.id, true);
      return this.repository.findByIdOrThrow(row.id);
    });
    return { broadcast: SuperadminBroadcastsMapper.toResponse(SuperadminBroadcastsMapper.toDomain(broadcast)), recipientId: input.recipientId, deliveryStatus: 'DELIVERED', deliveredAt };
  }
}