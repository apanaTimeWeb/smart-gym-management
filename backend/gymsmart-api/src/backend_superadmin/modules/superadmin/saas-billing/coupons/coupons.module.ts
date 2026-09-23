// RESPONSIBILITY: Registers the coupons feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { CouponsRedemptionsQueryController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons-redemptions-query.controller';
import { CouponsRestoreCommandController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons-restore-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons.entity';
import { CouponsRepository } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons.repository';
import { CouponsQueryController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons-query.controller';
import { CouponsCommandController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons-command.controller';
import { CouponsListService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-list.service';
import { CouponsFindService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-find.service';
import { CouponsCreateService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-create.service';
import { CouponsUpdateService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-update.service';
import { CouponsDeleteService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-delete.service';
import { CouponsStatusService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-status.service';
import { CouponsRedemptionsService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-redemptions.service';
import { CouponsRestoreService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-restore.service';
@Module({
  imports: [TypeOrmModule.forFeature([CouponsEntity])],
  controllers: [CouponsQueryController, CouponsCommandController, CouponsRedemptionsQueryController, CouponsRestoreCommandController],
  providers: [CouponsRedemptionsService, CouponsRestoreService, CouponsRepository, CouponsListService, CouponsFindService, CouponsCreateService, CouponsUpdateService, CouponsDeleteService, CouponsStatusService],
  exports: [CouponsRepository],
})
export class CouponsModule {}