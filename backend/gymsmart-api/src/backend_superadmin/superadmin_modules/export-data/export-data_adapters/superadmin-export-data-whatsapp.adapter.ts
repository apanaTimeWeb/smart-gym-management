// RESPONSIBILITY: Sends export-ready WhatsApp notifications through the configured external provider adapter.
// FLOW: Export delivery service -> circuit breaker -> bounded HTTP adapter -> provider.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminCoreCircuitBreakerService } from '@/backend_superadmin/superadmin_core/superadmin_core_external/superadmin-core-circuit-breaker.service';
import { TIMEOUT_CONFIG } from '@/backend_superadmin/superadmin_core/superadmin_core_config/superadmin-core-timeout.config';
import { SuperadminExportWhatsappDeliveryException, SuperadminExportWhatsappTimeoutException } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.exceptions';

/**
 * Primary Intent: Defines SuperadminExportDataWhatsappAdapter as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataWhatsappAdapter {
  constructor(private readonly config: ConfigService, private readonly circuitBreaker: SuperadminCoreCircuitBreakerService) {}

  /**
 * Primary Intent: Executes the isConfigured use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  isConfigured(): boolean { return Boolean(this.config.get<string>('app.exportWhatsappWebhookUrl')); }

  /**
 * Primary Intent: Executes the send use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async send(phone: string, downloadUrl: string, expiresAt: string): Promise<void> {
    const endpoint = this.config.getOrThrow<string>('app.exportWhatsappWebhookUrl');
    await this.circuitBreaker.execute('export-whatsapp', async () => this.post(endpoint, phone, downloadUrl, expiresAt));
  }

  /**
 * Primary Intent: Executes the `post` responsibility owned by this superadmin-export-data-whatsapp.adapter construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the post use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async post(endpoint: string, phone: string, downloadUrl: string, expiresAt: string): Promise<void> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_CONFIG.WHATSAPP_API_MS);
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ phone, template: 'EXPORT_READY', downloadUrl, expiresAt }), signal: controller.signal });
      if (!response.ok) throw new SuperadminExportWhatsappDeliveryException();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') throw new SuperadminExportWhatsappTimeoutException();
      throw error;
    } finally {
      /**
       * Primary Intent: Executes the `clearTimeout` responsibility owned by this feature-local superadmin-export-data-whatsapp.adapter construct.
       * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
       * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
       * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
       */
      clearTimeout(timeout);
    }
  }
}
