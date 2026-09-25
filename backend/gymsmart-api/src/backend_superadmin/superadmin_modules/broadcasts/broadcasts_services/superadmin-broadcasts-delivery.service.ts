// RESPONSIBILITY: Applies one broadcast recipient delivery result and keeps counts consistent.
// FLOW: delivery command -> broadcast existence -> atomic count update -> response.
import { Injectable } from '@nestjs/common';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastDeliveryResultDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_responses/superadmin-broadcasts-response.dto';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';
import { SuperadminBroadcastsMapper } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.mapper';

/**
 * Primary Intent: Defines SuperadminBroadcastsDeliveryService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminBroadcastsDeliveryService {
  constructor(private readonly repository: SuperadminBroadcastsRepository, private readonly unitOfWork: SuperadminCoreUnitOfWorkService) {}
/**
 * Primary Intent: Executes the deliver use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

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
