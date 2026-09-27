// RESPONSIBILITY: Isolates external communications provider HTTP calls from Manager business logic.
// FLOW: Durable delivery job -> selected medium endpoint -> bounded HTTP request -> normalized provider result.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { ManagerCoreCircuitBreakerService } from '@/backend_manager/manager_core/manager_core_infrastructure/manager-core-circuit-breaker.service';
import { TIMEOUT_CONFIG } from '@/backend_manager/manager_core/manager_core_config/manager-core-timeout.config';
import { CommunicationsDeliveryMedium } from '@/backend_manager/manager_modules/communications/manager-communications-delivery.constants';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface CommunicationsDeliveryResult { delivered: boolean; providerMessageId?: string; }

@Injectable()
export class ManagerCommunicationsDeliveryAdapter {
  constructor(private readonly config: ManagerCoreConfigService, private readonly circuitBreaker: ManagerCoreCircuitBreakerService) {}

  /**
   * @description Executes send within its declared architectural boundary.
   * @param medium - Validated input for the operation.
   * @param payload - Validated input for the operation.
   * @param idempotencyKey - Validated input for the operation.
   * @returns Promise<CommunicationsDeliveryResult>.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async send(medium: CommunicationsDeliveryMedium, payload: ManagerCoreJsonObject, idempotencyKey: string): Promise<CommunicationsDeliveryResult> {
    const endpoint = medium === CommunicationsDeliveryMedium.EMAIL ? this.config.communicationsEmailProviderUrl : this.config.communicationsWhatsappProviderUrl;
    if (!endpoint) throw new ManagerCoreBusinessException('communications.ERRORS.PROVIDER_NOT_CONFIGURED', 'COMMUNICATIONS.PROVIDER.NOT_CONFIGURED', HttpStatus.SERVICE_UNAVAILABLE);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), medium === CommunicationsDeliveryMedium.EMAIL ? TIMEOUT_CONFIG.EXTERNAL_API_DEFAULT_MS : TIMEOUT_CONFIG.WHATSAPP_API_MS);
    try {
      const response = await this.circuitBreaker.execute(`communications:${medium}`, () => fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json', 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(payload), signal: controller.signal }));
      if (!response.ok) throw new ManagerCoreBusinessException('communications.ERRORS.PROVIDER_HTTP_FAILURE', 'COMMUNICATIONS.PROVIDER.HTTP_FAILURE', HttpStatus.BAD_GATEWAY);
      const responseBody: unknown = await response.json().catch(() => ({}));
      const providerMessageId = typeof responseBody === 'object' && responseBody !== null && 'id' in responseBody ? String((responseBody as Record<string, unknown>).id) : undefined;
      return { delivered: true, providerMessageId };
    } finally {
      clearTimeout(timeout);
    }
  }
}

export { ManagerCommunicationsDeliveryAdapter as CommunicationsDeliveryAdapter };
