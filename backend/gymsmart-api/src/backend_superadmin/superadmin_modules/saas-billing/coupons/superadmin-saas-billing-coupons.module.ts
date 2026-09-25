// RESPONSIBILITY: Registers the coupons feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminSaasBillingCouponsRedemptionsQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons-redemptions-query.controller';
import { SuperadminSaasBillingCouponsRestoreCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons-restore-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSaasBillingCouponsEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.entity';
import { SuperadminSaasBillingCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
import { SuperadminSaasBillingCouponsQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons-query.controller';
import { SuperadminSaasBillingCouponsCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons-command.controller';
import { SuperadminSaasBillingCouponsListService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-list.service';
import { SuperadminSaasBillingCouponsFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-find.service';
import { SuperadminSaasBillingCouponsCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-create.service';
import { SuperadminSaasBillingCouponsUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-update.service';
import { SuperadminSaasBillingCouponsDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-delete.service';
import { SuperadminSaasBillingCouponStatusService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-status.service';
import { SuperadminSaasBillingCouponsRedemptionsService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-redemptions.service';
import { SuperadminSaasBillingCouponsRestoreService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-restore.service';
/**
 * Primary Intent: Defines SuperadminSaasBillingCouponsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSaasBillingCouponsEntity])],
  controllers: [SuperadminSaasBillingCouponsRedemptionsQueryController, SuperadminSaasBillingCouponsRestoreCommandController, SuperadminSaasBillingCouponsCommandController, SuperadminSaasBillingCouponsQueryController],
  providers: [SuperadminSaasBillingCouponsRedemptionsService, SuperadminSaasBillingCouponsRestoreService, SuperadminSaasBillingCouponsRepository, SuperadminSaasBillingCouponsListService, SuperadminSaasBillingCouponsFindService, SuperadminSaasBillingCouponsCreateService, SuperadminSaasBillingCouponsUpdateService, SuperadminSaasBillingCouponsDeleteService, SuperadminSaasBillingCouponStatusService],
  exports: [SuperadminSaasBillingCouponsRepository],
})
/**
 * Primary Intent: Defines SuperadminSaasBillingCouponsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSaasBillingCouponsModule {}
