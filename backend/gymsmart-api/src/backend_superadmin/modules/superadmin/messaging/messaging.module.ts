// RESPONSIBILITY: Registers the messaging feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagingContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging-contract-snapshot.entity';
import { MessagingContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging-contract-snapshot.repository';
import { TenantMessageEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging.entity';
import { MessagingRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging.repository';
import { MessagingQueryController } from '@/backend_superadmin/modules/superadmin/messaging/messaging-query.controller';
import { MessagingCommandController } from '@/backend_superadmin/modules/superadmin/messaging/messaging-command.controller';
import { MessagingListService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-list.service';
import { MessagingFindService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-find.service';
import { MessagingCreateService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-create.service';
import { MessagingUpdateService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-update.service';
import { MessagingDeleteService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-delete.service';
import { MessagingStatusService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-status.service';
import { MessagingTemplateInsightsService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-template-insights.service';
import { MessagingWhatsAppBulkCenterService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-whatsapp-bulk-center.service';
import { MessagingWhatsAppCampaignService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-whatsapp-campaign.service';
import { MessagingSpecialController } from '@/backend_superadmin/modules/superadmin/messaging/messaging-special.controller';
import { SuperadminNotificationEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging-notification.entity';
import { MessagingNotificationRepository } from '@/backend_superadmin/modules/superadmin/messaging/messaging-notification.repository';
import { MessagingNotificationService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-notification.service';
import { MessagingNotificationController } from '@/backend_superadmin/modules/superadmin/messaging/messaging-notification.controller';
import { MessagingCompatibilityController, MessagingInsightsCompatibilityController } from '@/backend_superadmin/modules/superadmin/messaging/messaging-compatibility.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessagingContractSnapshotEntity, TenantMessageEntity, SuperadminNotificationEntity])],
  controllers: [MessagingQueryController, MessagingCommandController, MessagingSpecialController, MessagingNotificationController, MessagingCompatibilityController, MessagingInsightsCompatibilityController],
  providers: [MessagingNotificationRepository, MessagingNotificationService, MessagingContractSnapshotRepository, MessagingTemplateInsightsService, MessagingWhatsAppBulkCenterService, MessagingWhatsAppCampaignService, MessagingRepository, MessagingListService, MessagingFindService, MessagingCreateService, MessagingUpdateService, MessagingDeleteService, MessagingStatusService],
  exports: [MessagingRepository],
})
export class MessagingModule {}
