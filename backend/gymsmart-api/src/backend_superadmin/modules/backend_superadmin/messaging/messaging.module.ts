// RESPONSIBILITY: Registers the messaging feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { MessagingInsightsQueryController } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-insights-query.controller';
import { MessagingWhatsappCommandController } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-whatsapp-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagingEntity } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging.entity';
import { MessagingRepository } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging.repository';
import { MessagingQueryController } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-query.controller';
import { MessagingCommandController } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-command.controller';
import { MessagingListService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-list.service';
import { MessagingFindService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-find.service';
import { MessagingCreateService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-create.service';
import { MessagingUpdateService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-update.service';
import { MessagingDeleteService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-delete.service';
import { MessagingStatusService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-status.service';
import { MessagingTemplateInsightsService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-template-insights.service';
import { MessagingWhatsappBulkCenterService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-whatsapp-bulk-center.service';
import { MessagingWhatsappCampaignService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-whatsapp-campaign.service';
import { MessagingNotificationEntity } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-notification.entity';
import { MessagingNotificationRepository } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-notification.repository';
import { MessagingNotificationService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-notification.service';
import { MessagingNotificationController } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-notification.controller';
import { MessagingExportCompletionService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-export-completion.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessagingEntity, MessagingNotificationEntity])],
  controllers: [MessagingQueryController, MessagingCommandController, MessagingNotificationController, MessagingInsightsQueryController, MessagingWhatsappCommandController],
  providers: [MessagingNotificationRepository, MessagingNotificationService, MessagingExportCompletionService, MessagingTemplateInsightsService, MessagingWhatsappBulkCenterService, MessagingWhatsappCampaignService, MessagingRepository, MessagingListService, MessagingFindService, MessagingCreateService, MessagingUpdateService, MessagingDeleteService, MessagingStatusService],
  exports: [MessagingRepository],
})
export class MessagingModule {}