// RESPONSIBILITY: Sends export-ready email through the configured external provider adapter.
// FLOW: Export delivery service -> circuit breaker -> bounded HTTP adapter -> provider.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminCoreCircuitBreakerService } from '@/backend_superadmin/superadmin_core/superadmin_core_external/superadmin-core-circuit-breaker.service';
import { TIMEOUT_CONFIG } from '@/backend_superadmin/superadmin_core/superadmin_core_config/superadmin-core-timeout.config';
import { SuperadminExportEmailDeliveryException, SuperadminExportEmailTimeoutException } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.exceptions';

/**
 * Primary Intent: Defines SuperadminExportDataEmailAdapter as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataEmailAdapter {
  constructor(private readonly config: ConfigService, private readonly circuitBreaker: SuperadminCoreCircuitBreakerService) {}

  /**
 * Primary Intent: Executes the send use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async send(recipient: string, downloadUrl: string, expiresAt: string): Promise<void> {
    const endpoint = this.config.getOrThrow<string>('app.exportEmailWebhookUrl');
    await this.circuitBreaker.execute('export-email', async () => this.post(endpoint, recipient, downloadUrl, expiresAt));
  }

  /**
 * Primary Intent: Executes the `post` responsibility owned by this feature-local superadmin-export-data-email.adapter construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the post use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async post(endpoint: string, recipient: string, downloadUrl: string, expiresAt: string): Promise<void> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_CONFIG.EXTERNAL_API_DEFAULT_MS);
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ recipient, subject: 'GymSmart export is ready', downloadUrl, expiresAt }), signal: controller.signal });
      if (!response.ok) throw new SuperadminExportEmailDeliveryException();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') throw new SuperadminExportEmailTimeoutException();
      throw error;
    } finally {
      /**
       * Primary Intent: Executes the `clearTimeout` responsibility owned by this feature-local superadmin-export-data-email.adapter construct.
       * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
       * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
       * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
       */
      clearTimeout(timeout);
    }
  }
}
