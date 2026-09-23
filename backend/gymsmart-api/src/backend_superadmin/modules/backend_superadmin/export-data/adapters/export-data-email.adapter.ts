// RESPONSIBILITY: Sends export-ready email through the configured external provider adapter.
// FLOW: Export delivery service -> circuit breaker -> bounded HTTP adapter -> provider.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CircuitBreakerService } from '@/backend_superadmin/core/external/circuit-breaker.service';
import { TIMEOUT_CONFIG } from '@/backend_superadmin/core/config/timeout.config';
import { ExportEmailDeliveryException, ExportEmailTimeoutException } from '@/backend_superadmin/modules/backend_superadmin/export-data/export-data.exceptions';

@Injectable()
export class ExportDataEmailAdapter {
  constructor(private readonly config: ConfigService, private readonly circuitBreaker: CircuitBreakerService) {}

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
      if (!response.ok) throw new ExportEmailDeliveryException();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') throw new ExportEmailTimeoutException();
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
