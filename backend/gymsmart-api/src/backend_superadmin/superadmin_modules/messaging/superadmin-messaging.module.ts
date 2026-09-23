// RESPONSIBILITY: Registers the messaging feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminMessagingInsightsQueryController } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-insights-query.controller';
import { SuperadminMessagingWhatsappCommandController } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-whatsapp-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminMessagingEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.entity';
import { SuperadminMessagingRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.repository';
import { SuperadminMessagingQueryController } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-query.controller';
import { SuperadminMessagingCommandController } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-command.controller';
import { SuperadminMessagingListService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-list.service';
import { SuperadminMessagingFindService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-find.service';
import { SuperadminMessagingCreateService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-create.service';
import { SuperadminMessagingUpdateService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-update.service';
import { SuperadminMessagingDeleteService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-delete.service';
import { SuperadminMessagingStatusService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-status.service';
import { SuperadminMessagingTemplateInsightsService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-template-insights.service';
import { SuperadminMessagingWhatsappBulkCenterService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-whatsapp-bulk-center.service';
import { SuperadminMessagingWhatsappCampaignService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-whatsapp-campaign.service';
import { SuperadminMessagingNotificationEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.entity';
import { SuperadminMessagingNotificationRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.repository';
import { SuperadminMessagingNotificationService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-notification.service';
import { SuperadminMessagingNotificationController } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.controller';
import { SuperadminMessagingExportCompletionService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-export-completion.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperadminMessagingEntity, SuperadminMessagingNotificationEntity])],
  controllers: [SuperadminMessagingQueryController, SuperadminMessagingCommandController, SuperadminMessagingNotificationController, SuperadminMessagingInsightsQueryController, SuperadminMessagingWhatsappCommandController],
  providers: [SuperadminMessagingNotificationRepository, SuperadminMessagingNotificationService, SuperadminMessagingExportCompletionService, SuperadminMessagingTemplateInsightsService, SuperadminMessagingWhatsappBulkCenterService, SuperadminMessagingWhatsappCampaignService, SuperadminMessagingRepository, SuperadminMessagingListService, SuperadminMessagingFindService, SuperadminMessagingCreateService, SuperadminMessagingUpdateService, SuperadminMessagingDeleteService, SuperadminMessagingStatusService],
  exports: [SuperadminMessagingRepository],
})
export class SuperadminMessagingModule {}