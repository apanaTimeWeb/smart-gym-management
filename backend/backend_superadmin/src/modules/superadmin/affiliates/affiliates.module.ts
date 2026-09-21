// RESPONSIBILITY: Registers the affiliates feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliateEntity } from '@/modules/superadmin/affiliates/affiliates.entity';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesQueryController } from '@/modules/superadmin/affiliates/affiliates-query.controller';
import { AffiliatesCommandController } from '@/modules/superadmin/affiliates/affiliates-command.controller';
import { AffiliatesListService } from '@/modules/superadmin/affiliates/services/affiliates-list.service';
import { AffiliatesFindService } from '@/modules/superadmin/affiliates/services/affiliates-find.service';
import { AffiliatesCreateService } from '@/modules/superadmin/affiliates/services/affiliates-create.service';
import { AffiliatesUpdateService } from '@/modules/superadmin/affiliates/services/affiliates-update.service';
import { AffiliatesDeleteService } from '@/modules/superadmin/affiliates/services/affiliates-delete.service';
import { AffiliatesStatusService } from '@/modules/superadmin/affiliates/services/affiliates-status.service';
@Module({
  imports: [TypeOrmModule.forFeature([AffiliateEntity])],
  controllers: [AffiliatesQueryController, AffiliatesCommandController],
  providers: [AffiliatesRepository, AffiliatesListService, AffiliatesFindService, AffiliatesCreateService, AffiliatesUpdateService, AffiliatesDeleteService, AffiliatesStatusService],
  exports: [AffiliatesRepository],
})
export class AffiliatesModule {}
