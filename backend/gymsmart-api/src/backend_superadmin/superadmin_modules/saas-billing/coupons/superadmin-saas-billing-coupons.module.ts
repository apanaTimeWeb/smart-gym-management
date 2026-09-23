// RESPONSIBILITY: Registers the coupons feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminCouponsRedemptionsQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons-redemptions-query.controller';
import { SuperadminCouponsRestoreCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons-restore-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminCouponsEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.entity';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
import { SuperadminCouponsQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons-query.controller';
import { SuperadminCouponsCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons-command.controller';
import { SuperadminCouponsListService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-list.service';
import { SuperadminCouponsFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-find.service';
import { SuperadminCouponsCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-create.service';
import { SuperadminCouponsUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-update.service';
import { SuperadminCouponsDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-delete.service';
import { SuperadminCouponsStatusService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-status.service';
import { SuperadminCouponsRedemptionsService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-redemptions.service';
import { SuperadminCouponsRestoreService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-restore.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminCouponsEntity])],
  controllers: [SuperadminCouponsQueryController, SuperadminCouponsCommandController, SuperadminCouponsRedemptionsQueryController, SuperadminCouponsRestoreCommandController],
  providers: [SuperadminCouponsRedemptionsService, SuperadminCouponsRestoreService, SuperadminCouponsRepository, SuperadminCouponsListService, SuperadminCouponsFindService, SuperadminCouponsCreateService, SuperadminCouponsUpdateService, SuperadminCouponsDeleteService, SuperadminCouponsStatusService],
  exports: [SuperadminCouponsRepository],
})
export class SuperadminCouponsModule {}