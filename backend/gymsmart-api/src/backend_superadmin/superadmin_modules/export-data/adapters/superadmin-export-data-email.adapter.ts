// RESPONSIBILITY: Sends export-ready email through the configured external provider adapter.
// FLOW: Export delivery service -> circuit breaker -> bounded HTTP adapter -> provider.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminCircuitBreakerService } from '@/backend_superadmin/superadmin_core/external/superadmin-core-circuit-breaker.service';
import { TIMEOUT_CONFIG } from '@/backend_superadmin/superadmin_core/config/superadmin-core-timeout.config';
import { SuperadminExportEmailDeliveryException, SuperadminExportEmailTimeoutException } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.exceptions';

@Injectable()
export class SuperadminExportDataEmailAdapter {
  constructor(private readonly config: ConfigService, private readonly circuitBreaker: SuperadminCircuitBreakerService) {}

  /** Sends one export-ready email notification through the configured provider. */
  async send(recipient: string, downloadUrl: string, expiresAt: string): Promise<void> {
    const endpoint = this.config.getOrThrow<string>('app.exportEmailWebhookUrl');
    await this.circuitBreaker.execute('export-email', async () => this.post(endpoint, recipient, downloadUrl, expiresAt));
  }

  /** Executes the provider call with the mandated external API timeout tier. */
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
      clearTimeout(timeout);
    }
  }
}
