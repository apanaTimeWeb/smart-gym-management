// RESPONSIBILITY: Performs status transitions for messaging records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { TenantMessageStatus } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.constants';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { SuperadminMessagingMapper } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.mapper';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_responses/superadmin-messaging-response.dto';
/**
 * Primary Intent: Defines SuperadminTenantMessageStatusService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminTenantMessageStatusService {
  constructor(private readonly repository: SuperadminMessagingRepository) {}
/**
 * Primary Intent: Executes the changeTenantMessageStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the changeTenantMessageStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async changeTenantMessageStatus(id: string, status: string): Promise<SuperadminMessagingResponseDto> { return SuperadminMessagingMapper.toResponse(SuperadminMessagingMapper.toDomain(await this.repository.updateMessagingById(id, { status: status as TenantMessageStatus }))); }
}
