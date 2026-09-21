// RESPONSIBILITY: Registers the messaging feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagingContractSnapshotEntity } from '@/modules/superadmin/messaging/messaging-contract-snapshot.entity';
import { MessagingContractSnapshotRepository } from '@/modules/superadmin/messaging/messaging-contract-snapshot.repository';
import { TenantMessageEntity } from '@/modules/superadmin/messaging/messaging.entity';
import { MessagingRepository } from '@/modules/superadmin/messaging/messaging.repository';
import { MessagingQueryController } from '@/modules/superadmin/messaging/messaging-query.controller';
import { MessagingCommandController } from '@/modules/superadmin/messaging/messaging-command.controller';
import { MessagingListService } from '@/modules/superadmin/messaging/services/messaging-list.service';
import { MessagingFindService } from '@/modules/superadmin/messaging/services/messaging-find.service';
import { MessagingCreateService } from '@/modules/superadmin/messaging/services/messaging-create.service';
import { MessagingUpdateService } from '@/modules/superadmin/messaging/services/messaging-update.service';
import { MessagingDeleteService } from '@/modules/superadmin/messaging/services/messaging-delete.service';
import { MessagingStatusService } from '@/modules/superadmin/messaging/services/messaging-status.service';
import { MessagingTemplateInsightsService } from '@/modules/superadmin/messaging/services/messaging-template-insights.service';
import { MessagingWhatsAppBulkCenterService } from '@/modules/superadmin/messaging/services/messaging-whatsapp-bulk-center.service';
import { MessagingWhatsAppCampaignService } from '@/modules/superadmin/messaging/services/messaging-whatsapp-campaign.service';
import { MessagingSpecialController } from '@/modules/superadmin/messaging/messaging-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([MessagingContractSnapshotEntity, TenantMessageEntity])],
  controllers: [MessagingQueryController, MessagingCommandController, MessagingSpecialController],
  providers: [MessagingContractSnapshotRepository, MessagingTemplateInsightsService, MessagingWhatsAppBulkCenterService, MessagingWhatsAppCampaignService, MessagingRepository, MessagingListService, MessagingFindService, MessagingCreateService, MessagingUpdateService, MessagingDeleteService, MessagingStatusService],
  exports: [MessagingRepository],
})
export class MessagingModule {}
