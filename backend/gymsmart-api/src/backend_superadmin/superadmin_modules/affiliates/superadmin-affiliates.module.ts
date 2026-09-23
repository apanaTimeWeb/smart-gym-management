// RESPONSIBILITY: Registers the affiliates feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminAffiliatesEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.entity';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesQueryController } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates-query.controller';
import { SuperadminAffiliatesCommandController } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates-command.controller';
import { SuperadminAffiliatesListService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-list.service';
import { SuperadminAffiliatesFindService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-find.service';
import { SuperadminAffiliatesCreateService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-create.service';
import { SuperadminAffiliatesUpdateService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-update.service';
import { SuperadminAffiliatesDeleteService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-delete.service';
import { SuperadminAffiliatesStatusService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-status.service';
import { SuperadminAffiliatesPayoutService } from '@/backend_superadmin/superadmin_modules/affiliates/services/superadmin-affiliates-payout.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminAffiliatesEntity])],
  controllers: [SuperadminAffiliatesQueryController, SuperadminAffiliatesCommandController],
  providers: [SuperadminAffiliatesStatusService, SuperadminAffiliatesPayoutService, SuperadminAffiliatesRepository, SuperadminAffiliatesListService, SuperadminAffiliatesFindService, SuperadminAffiliatesCreateService, SuperadminAffiliatesUpdateService, SuperadminAffiliatesDeleteService],
  exports: [SuperadminAffiliatesRepository],
})
export class SuperadminAffiliatesModule {}