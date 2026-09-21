// RESPONSIBILITY: Registers the coupons feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponEntity } from '@/modules/superadmin/saas-billing/coupons/coupons.entity';
import { CouponsRepository } from '@/modules/superadmin/saas-billing/coupons/coupons.repository';
import { CouponsQueryController } from '@/modules/superadmin/saas-billing/coupons/coupons-query.controller';
import { CouponsCommandController } from '@/modules/superadmin/saas-billing/coupons/coupons-command.controller';
import { CouponsListService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-list.service';
import { CouponsFindService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-find.service';
import { CouponsCreateService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-create.service';
import { CouponsUpdateService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-update.service';
import { CouponsDeleteService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-delete.service';
import { CouponsStatusService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-status.service';
import { CouponsRedemptionsService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-redemptions.service';
import { CouponsRestoreService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-restore.service';
import { CouponsSpecialController } from '@/modules/superadmin/saas-billing/coupons/coupons-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([CouponEntity])],
  controllers: [CouponsQueryController, CouponsCommandController, CouponsSpecialController],
  providers: [CouponsRedemptionsService, CouponsRestoreService, CouponsRepository, CouponsListService, CouponsFindService, CouponsCreateService, CouponsUpdateService, CouponsDeleteService, CouponsStatusService],
  exports: [CouponsRepository],
})
export class CouponsModule {}
