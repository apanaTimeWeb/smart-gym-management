// RESPONSIBILITY: Generates and persists a one-time integration secret for a tenant.
// FLOW: Controller -> SuperadminIntegrationsGenerateKeyService -> crypto -> SuperadminIntegrationsRepository -> response.
import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { IntegrationKeyStatus } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';
import { IntegrationKeyScope } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';
import { SuperadminIntegrationsGenerateKeyDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_dtos/superadmin-integrations-generate-key.dto';
import { SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_responses/superadmin-integrations-response-data.dto';

/**
 * Primary Intent: Defines SuperadminIntegrationsGenerateKeyService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminIntegrationsGenerateKeyService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}
/**
 * Primary Intent: Executes the generateIntegrationKey use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** @description Generates a new integration secret, persists its hash and selected scopes, and returns the secret once.
   * @param input - Validated tenant, label, and permission scopes.
   * @returns One-time API-key response.
   */
  /**
   * Primary Intent: Executes the generateIntegrationKey use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async generateIntegrationKey(input: SuperadminIntegrationsGenerateKeyDto): Promise<SuperadminGenerateApiKeyResultDto> {
    const label = input.label.trim();
    const scopes = [...new Set(input.scopes)] as IntegrationKeyScope[];
    const secret = `sk_live_${randomBytes(24).toString('hex')}`;
    const created = await this.repository.createIntegrations({
      tenantId: input.tenantId,
      label,
      status: IntegrationKeyStatus.ACTIVE,
      lastUsed: null,
      rateLimit: 100,
      secretHash: createHash('sha256').update(secret).digest('hex'),
      scopes,
    });
    return {
      key: { id: created.id, tenant: created.tenantId, label: created.label, status: created.status, lastUsed: created.lastUsed ? created.lastUsed.toISOString() : null, rateLimit: created.rateLimit.toString() },
      secretKey: secret,
      scopes,
    };
  }
}
