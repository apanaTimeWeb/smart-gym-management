// RESPONSIBILITY: Executes partial update business flow for the affiliates feature.
// FLOW: CommandController -> SuperadminAffiliatesUpdateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminCoreEncryptionService } from '@/backend_superadmin/superadmin_core/superadmin_core_security/superadmin-core-encryption.service';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto';
import type { SuperadminAffiliatesUpdateInput } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_types/superadmin-affiliates.interfaces';
/**
 * Primary Intent: Defines SuperadminAffiliatesUpdateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminAffiliatesUpdateService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly config: ConfigService, private readonly encryption: SuperadminCoreEncryptionService) {}
/**
 * Primary Intent: Executes the updateAffiliates use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateAffiliates use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateAffiliates(id: string, input: SuperadminAffiliatesUpdateInput): Promise<SuperadminAffiliatesResponseDto> { const next = { ...input, currency: input.currency?.toUpperCase(), ...(input.bankDetails !== undefined ? { bankDetails: input.bankDetails ? this.encryption.encrypt(JSON.stringify(input.bankDetails)) : null } : {}) }; const updated = await this.repository.updateAffiliatesById(id, next); return SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(updated), this.config.getOrThrow<string>('app.defaultCurrency')); }
}
