// RESPONSIBILITY: Generates and persists a one-time integration secret for a tenant.
// FLOW: Controller -> IntegrationsGenerateKeyService -> crypto -> IntegrationsRepository -> response.
import { Injectable, BadRequestException } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { IntegrationsRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations.repository';
import { IntegrationKeyStatus } from '@/backend_superadmin/modules/superadmin/integrations/integrations.entity';
import { SuperadminGenerateApiKeyResultDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response-data.dto';

@Injectable()
export class IntegrationsGenerateKeyService {
  constructor(private readonly repository: IntegrationsRepository) {}

  /** Generates a new integration secret, stores only its hash, and returns the secret once. */
  async generateIntegrationKey(input: Record<string, unknown> = {}): Promise<SuperadminGenerateApiKeyResultDto> {
    const body = input.body as Record<string, unknown> | undefined;
    const label = typeof body?.label === 'string' ? body.label.trim() : '';
    const tenantId = typeof body?.tenantId === 'string' ? body.tenantId : '';
    const scopes = Array.isArray(body?.scopes) ? body.scopes.filter((item): item is string => typeof item === 'string') : [];
    if (!label || !tenantId) throw new BadRequestException('label and tenantId are required');
    const secret = `sk_live_${randomBytes(24).toString('hex')}`;
    const created = await this.repository.createIntegrations({ tenantId, label, status: IntegrationKeyStatus.ACTIVE, lastUsed: null, rateLimit: 100, secretHash: createHash('sha256').update(secret).digest('hex') } as never);
    return { key: { id: created.id, tenant: created.tenantId, label: created.label, status: created.status, lastUsed: created.lastUsed ? created.lastUsed.toISOString() : null, rateLimit: created.rateLimit.toString() }, secretKey: secret } as SuperadminGenerateApiKeyResultDto;
  }
}
