// RESPONSIBILITY: Groups the Superadmin SaaS billing feature modules under the frontend-mirrored saas-billing container.
// FLOW: AppModule -> SuperadminSaasBillingModule -> coupons/invoices/plans feature modules.
import { Module } from '@nestjs/common';
import { SuperadminCouponsModule } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.module';
import { SuperadminInvoicesModule } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.module';
import { SuperadminPlansModule } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.module';

@Module({ imports: [SuperadminCouponsModule, SuperadminInvoicesModule, SuperadminPlansModule] })
export class SuperadminSaasBillingModule {}