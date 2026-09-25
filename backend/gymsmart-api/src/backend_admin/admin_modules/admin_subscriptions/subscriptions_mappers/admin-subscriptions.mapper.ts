// RESPONSIBILITY: Translates subscription persistence entities into ORM-independent Admin subscription domain contracts.
// FLOW: TypeORM master/tenant entity -> AdminSubscriptionsMapper -> domain object -> service.
import { AdminCoreMasterInvoiceEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-invoice.entity'

import { AdminCoreMasterPaymentMethodEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-payment-method.entity'

import { AdminCoreMasterPlanEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-plan.entity'

import { AdminCoreMasterSubscriptionEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-subscription.entity'

import { AdminSubscriptionsDomainModel, AdminSubscriptionDomain, AdminSubscriptionInvoiceDomain, AdminSubscriptionPaymentMethodDomain, AdminSubscriptionPlanDomain } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_domain/admin-subscriptions.domain'

import { AdminSubscriptionsEntity } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_entities/admin-subscriptions-entity'

/**
 * @description Owns the ORM-to-domain translation boundary for AdminSubscriptions.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminSubscriptionsMapper {
/** @description Converts the tenant snapshot entity to an ORM-independent domain object. @param entity Stored entity. @returns Domain model. */
  toDomain(entity: AdminSubscriptionsEntity): AdminSubscriptionsDomainModel {
    return { id: entity.id, createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString(), name: entity.name, status: entity.status, data: { ...entity.payload } };
  }

  /** @description Converts the master subscription entity to the subscription domain contract. @param entity Master subscription. @returns Domain subscription. */
  toSubscriptionDomain(entity: AdminCoreMasterSubscriptionEntity): AdminSubscriptionDomain {
    return { id: entity.id, tenantId: entity.tenantId, planId: entity.planId, status: entity.status as any, autoRenew: entity.autoRenew, payload: { ...entity.payload } };
  }

  /** @description Converts a master plan entity to the subscription plan domain contract. @param entity Master plan. @returns Domain plan. */
  toPlanDomain(entity: AdminCoreMasterPlanEntity): AdminSubscriptionPlanDomain {
    return { id: entity.id, name: entity.name, tier: entity.tier as any, monthlyPriceMinor: entity.monthlyPriceMinor, annualPriceMinor: entity.annualPriceMinor, isActive: entity.isActive, payload: { ...entity.payload } };
  }

  /** @description Converts a master invoice entity to the invoice domain contract. @param entity Master invoice. @returns Domain invoice. */
  toInvoiceDomain(entity: AdminCoreMasterInvoiceEntity): AdminSubscriptionInvoiceDomain {
    return { id: entity.id, tenantId: entity.tenantId, invoiceNo: entity.invoiceNo, amountMinor: entity.amountMinor, status: entity.status as any, issuedAt: entity.issuedAt.toISOString(), payload: { ...entity.payload } };
  }

  /** @description Converts a master payment method entity to the payment method domain contract. @param entity Master payment method. @returns Domain payment method. */
  toPaymentMethodDomain(entity: AdminCoreMasterPaymentMethodEntity): AdminSubscriptionPaymentMethodDomain {
    return { id: entity.id, tenantId: entity.tenantId, provider: entity.provider, externalReference: entity.externalReference, isDefault: entity.isDefault, isActive: entity.isActive, payload: { ...entity.payload } };
  }
}
