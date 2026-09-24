// RESPONSIBILITY: Sends invoice resend messages through the configured email provider boundary.
// FLOW: Invoice resend worker -> circuit breaker -> bounded HTTP call -> provider.
import { Injectable, GatewayTimeoutException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminCoreCircuitBreakerService } from '@/backend_superadmin/superadmin_core/superadmin_core_external/superadmin-core-circuit-breaker.service';
import { TIMEOUT_CONFIG } from '@/backend_superadmin/superadmin_core/superadmin_core_config/superadmin-core-timeout.config';

/**
 * Primary Intent: Defines SuperadminInvoiceEmailPayload as the interface-level contract for superadmin-saas-billing-invoices-email.adapter.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminInvoiceEmailPayload {
  id: string;
  tenantName: string;
  amount: number;
  currency: string;
  planName: string;
  dueDate: Date;
}

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesEmailAdapter as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingInvoicesEmailAdapter {
  constructor(
    private readonly config: ConfigService,
    private readonly circuitBreaker: SuperadminCoreCircuitBreakerService,
  ) {}

  /**
 * Primary Intent: Executes the send use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async send(recipient: string, invoice: SuperadminInvoiceEmailPayload): Promise<void> {
    const endpoint = this.config.getOrThrow<string>('app.invoiceEmailWebhookUrl');
    await this.circuitBreaker.execute('invoice-email', () => this.post(endpoint, recipient, invoice));
  }

  /**
 * Primary Intent: Executes the `post` responsibility owned by this superadmin-saas-billing-invoices-email.adapter construct.
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
  private async post(endpoint: string, recipient: string, invoice: SuperadminInvoiceEmailPayload): Promise<void> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_CONFIG.EXTERNAL_API_DEFAULT_MS);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          recipient,
          subject: `Invoice ${invoice.id} for ${invoice.tenantName}`,
          invoiceId: invoice.id,
          tenantName: invoice.tenantName,
          amount: invoice.amount,
          currency: invoice.currency,
          planName: invoice.planName,
          dueDate: invoice.dueDate.toISOString(),
        }),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new ServiceUnavailableException({
          error: 'SERVICE_UNAVAILABLE',
          errorCode: 'INVOICES.EMAIL.DELIVERY_FAILED',
          message: { key: 'invoices.ERRORS.DELIVERY_FAILED' },
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new GatewayTimeoutException({
          error: 'TIMEOUT',
          errorCode: 'INVOICES.EMAIL.TIMEOUT',
          message: { key: 'invoices.ERRORS.TIMEOUT' },
        });
      }
      throw error;
    } finally {
      /**
       * Primary Intent: Executes the `clearTimeout` responsibility owned by this feature-local superadmin-saas-billing-invoices-email.adapter construct.
       * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
       * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
       * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
       */
      clearTimeout(timer);
    }
  }
}
