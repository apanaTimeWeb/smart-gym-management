// RESPONSIBILITY: Sends export-ready WhatsApp notifications through the configured external provider adapter.
// FLOW: Export delivery service -> circuit breaker -> bounded HTTP adapter -> provider.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CircuitBreakerService } from '@/backend_superadmin/core/external/circuit-breaker.service';
import { TIMEOUT_CONFIG } from '@/backend_superadmin/core/config/timeout.config';
import { ExportWhatsappDeliveryException, ExportWhatsappTimeoutException } from '@/backend_superadmin/modules/superadmin/export-data/export-data.exceptions';

@Injectable()
export class ExportDataWhatsappAdapter {
  constructor(private readonly config: ConfigService, private readonly circuitBreaker: CircuitBreakerService) {}

  /** Returns whether the optional WhatsApp provider is configured. */
  isConfigured(): boolean { return Boolean(this.config.get<string>('app.exportWhatsappWebhookUrl')); }

  /** Sends one export-ready WhatsApp notification when the optional provider is configured. */
  async send(phone: string, downloadUrl: string, expiresAt: string): Promise<void> {
    const endpoint = this.config.getOrThrow<string>('app.exportWhatsappWebhookUrl');
    await this.circuitBreaker.execute('export-whatsapp', async () => this.post(endpoint, phone, downloadUrl, expiresAt));
  }

  /** Executes the provider call with the mandated WhatsApp timeout tier. */
  private async post(endpoint: string, phone: string, downloadUrl: string, expiresAt: string): Promise<void> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_CONFIG.WHATSAPP_API_MS);
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ phone, template: 'EXPORT_READY', downloadUrl, expiresAt }), signal: controller.signal });
      if (!response.ok) throw new ExportWhatsappDeliveryException();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') throw new ExportWhatsappTimeoutException();
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
