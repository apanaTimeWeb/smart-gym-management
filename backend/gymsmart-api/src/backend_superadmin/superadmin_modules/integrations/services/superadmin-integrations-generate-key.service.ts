// RESPONSIBILITY: Generates and persists a one-time integration secret for a tenant.
// FLOW: Controller -> SuperadminIntegrationsGenerateKeyService -> crypto -> SuperadminIntegrationsRepository -> response.
import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { IntegrationKeyStatus } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.entity';
import { IntegrationKeyScope } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';
import { SuperadminIntegrationsGenerateKeyDto } from '@/backend_superadmin/superadmin_modules/integrations/dtos/superadmin-integrations-generate-key.dto';
import { SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response-data.dto';

@Injectable()
export class SuperadminIntegrationsGenerateKeyService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}

  /** @description Generates a new integration secret, persists its hash and selected scopes, and returns the secret once.
   * @param input - Validated tenant, label, and permission scopes.
   * @returns One-time API-key response.
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