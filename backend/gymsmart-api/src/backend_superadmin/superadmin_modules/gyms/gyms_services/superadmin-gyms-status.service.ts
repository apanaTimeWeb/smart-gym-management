// RESPONSIBILITY: Performs status transitions for gyms records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { GymsStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-response.dto';
/**
 * Primary Intent: Defines SuperadminGymsStatusService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsStatusService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly unitOfWork: SuperadminCoreUnitOfWorkService, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the changeGymsStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the changeGymsStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async changeGymsStatus(id: string, status: string): Promise<SuperadminGymsResponseDto> { const row = await this.unitOfWork.run(() => this.repository.updateGymStatusWithLock(id, status as GymsStatus));
    return SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(row), this.config.getOrThrow<string>('app.defaultCurrency')); }
}
