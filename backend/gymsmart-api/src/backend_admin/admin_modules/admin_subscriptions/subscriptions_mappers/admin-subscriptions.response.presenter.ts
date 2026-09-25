// RESPONSIBILITY: Presents ORM-independent AdminSubscriptions domain data as the frontend response contract.
// FLOW: Domain object -> AdminSubscriptionsResponsePresenter -> typed response DTO -> canonical response envelope.
import type { AdminSubscriptionsDomainModel } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_domain/admin-subscriptions.domain'

/**
 * @description Owns frontend response presentation for the AdminSubscriptions feature.
 * @remarks Receives only ORM-independent domain data and never imports persistence entities.
 */
export class AdminSubscriptionsResponsePresenter {
  /**
   * @description Converts the subscription read model to the frontend response contract.
   * @param domain ORM-independent subscription read model.
   * @returns Response-safe object.
   */
  toResponse(domain: AdminSubscriptionsDomainModel): Record<string, unknown> {
    return { id: domain.id, createdAt: domain.createdAt, updatedAt: domain.updatedAt, ...domain.data };
  }
}
