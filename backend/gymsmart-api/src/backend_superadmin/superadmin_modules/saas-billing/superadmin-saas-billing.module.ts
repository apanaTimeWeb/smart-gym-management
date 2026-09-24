// RESPONSIBILITY: Groups the Superadmin SaaS billing feature modules under the frontend-mirrored saas-billing container.
// FLOW: AppModule -> SuperadminSaasBillingModule -> coupons/invoices/plans feature modules.
import { Module } from '@nestjs/common';
import { SuperadminSaasBillingCouponsModule } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.module';
import { SuperadminSaasBillingInvoicesModule } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.module';
import { SuperadminSaasBillingPlansModule } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.module';

/**
 * Primary Intent: Defines SuperadminSaasBillingModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({ imports: [SuperadminSaasBillingCouponsModule, SuperadminSaasBillingInvoicesModule, SuperadminSaasBillingPlansModule] })
export class SuperadminSaasBillingModule {}
