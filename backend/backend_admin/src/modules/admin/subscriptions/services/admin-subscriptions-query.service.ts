// RESPONSIBILITY: Owns read-side use cases for Admin subscriptions; no write persistence occurs here.
// FLOW: AdminSubscriptionsQueryController → AdminSubscriptionsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminSubscriptionsRepository } from '@/modules/admin/subscriptions/repositories/admin-subscriptions-repository';
import { AdminSubscriptionsMapper } from '@/modules/admin/subscriptions/mappers/admin-subscriptions.mapper';
import { AdminSubscriptionsQueryDto } from '@/modules/admin/subscriptions/dtos/admin-subscriptions-query.dto';

@Injectable()
export class AdminSubscriptionsQueryService {
  constructor(
    private readonly repository: AdminSubscriptionsRepository,
    private readonly mapper: AdminSubscriptionsMapper,
  ) {}


  /** @description Executes fetchSubscription for the Admin subscriptions feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchSubscription(query: AdminSubscriptionsQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['subscription'] ?? {} : {};
  }

  /** @description Executes fetchPlans for the Admin subscriptions feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPlans(query: AdminSubscriptionsQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['plans'] ?? {} : {};
  }

  /** @description Executes fetchInvoices for the Admin subscriptions feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchInvoices(query: AdminSubscriptionsQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['invoices'] ?? {} : {};
  }

  /** @description Executes fetchPaymentMethods for the Admin subscriptions feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPaymentMethods(query: AdminSubscriptionsQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload['paymentMethods'] ?? {} : {};
  }

  /** @description Executes fetchKPIs for the Admin subscriptions feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminSubscriptionsQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload as Record<string, unknown>) : {};
  }
}
