// RESPONSIBILITY: Executes partial update business flow for the gyms feature.
// FLOW: CommandController -> SuperadminGymsUpdateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { SuperadminCoreTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-response.dto';
import * as bcrypt from 'bcrypt';
import type { SuperadminGymsUpdateInput } from '@/backend_superadmin/superadmin_modules/gyms/gyms_types/superadmin-gyms.interfaces';
/**
 * Primary Intent: Defines SuperadminGymsUpdateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsUpdateService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly registry: SuperadminCoreTenantRegistryRepository, private readonly unitOfWork: SuperadminCoreUnitOfWorkService, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the updateGyms use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateGyms use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateGyms(id: string, input: SuperadminGymsUpdateInput): Promise<SuperadminGymsResponseDto> {
    return this.unitOfWork.run(async () => {
      const { temporaryPassword, ...tenantInput } = input;
      const normalizedInput = tenantInput.currency ? { ...tenantInput, currency: tenantInput.currency.toUpperCase() } : tenantInput;
      const current = await this.repository.findByIdOrThrow(id);
      const updated = await this.repository.updateGymsById(id, normalizedInput);
      if (temporaryPassword?.trim()) {
        await this.registry.syncAdminAccount(updated.id, updated.adminEmail, await bcrypt.hash(temporaryPassword.trim(), 12));
      } else if (current.adminEmail !== updated.adminEmail) {
        await this.registry.syncAdminAccount(updated.id, updated.adminEmail);
      }
      return SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(updated), this.config.getOrThrow<string>('app.defaultCurrency'));
    });
  }
}
