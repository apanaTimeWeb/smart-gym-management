// RESPONSIBILITY: Groups the Superadmin SaaS billing feature modules under the frontend-mirrored saas-billing container.
// FLOW: AppModule -> SaaSBillingModule -> coupons/invoices/plans feature modules.
import { Module } from '@nestjs/common';
import { CouponsModule } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.module';
import { InvoicesModule } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.module';
import { PlansModule } from '@/backend_superadmin/modules/superadmin/saas-billing/plans/plans.module';

@Module({ imports: [CouponsModule, InvoicesModule, PlansModule] })
export class SaaSBillingModule {}
