// RESPONSIBILITY: Generates and persists a one-time integration secret for a tenant.
// FLOW: Controller -> IntegrationsGenerateKeyService -> crypto -> IntegrationsRepository -> response.
import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { IntegrationsRepository } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.repository';
import { IntegrationKeyStatus } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.entity';
import { IntegrationKeyScope } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.constants';
import { IntegrationsGenerateKeyDto } from '@/backend_superadmin/modules/backend_superadmin/integrations/dtos/integrations-generate-key.dto';
import { SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/modules/backend_superadmin/integrations/responses/integrations-response-data.dto';

@Injectable()
export class IntegrationsGenerateKeyService {
  constructor(private readonly repository: IntegrationsRepository) {}

  /** @description Generates a new integration secret, persists its hash and selected scopes, and returns the secret once.
   * @param input - Validated tenant, label, and permission scopes.
   * @returns One-time API-key response.
   */
  async generateIntegrationKey(input: IntegrationsGenerateKeyDto): Promise<SuperadminGenerateApiKeyResultDto> {
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