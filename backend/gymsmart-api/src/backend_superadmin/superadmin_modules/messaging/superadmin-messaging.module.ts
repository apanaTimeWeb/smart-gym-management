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
import { SuperadminMessagingListService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-list.service';
import { SuperadminMessagingFindService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-find.service';
import { SuperadminMessagingCreateService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-create.service';
import { SuperadminMessagingUpdateService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-update.service';
import { SuperadminMessagingDeleteService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-delete.service';
import { SuperadminMessagingStatusService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-status.service';
import { SuperadminMessagingTemplateInsightsService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-template-insights.service';
import { SuperadminMessagingWhatsappBulkCenterService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-whatsapp-bulk-center.service';
import { SuperadminMessagingWhatsappCampaignService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-whatsapp-campaign.service';
import { SuperadminMessagingNotificationEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.entity';
import { SuperadminMessagingNotificationRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.repository';
import { SuperadminMessagingNotificationService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-notification.service';
import { SuperadminMessagingNotificationQueryController } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification-query.controller';
import { SuperadminMessagingNotificationCommandController } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification-command.controller';
import { SuperadminMessagingExportCompletionService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-export-completion.service';

/**
 * Primary Intent: Defines SuperadminMessagingModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminMessagingEntity, SuperadminMessagingNotificationEntity])],
  controllers: [SuperadminMessagingQueryController, SuperadminMessagingCommandController, SuperadminMessagingNotificationQueryController, SuperadminMessagingNotificationCommandController, SuperadminMessagingInsightsQueryController, SuperadminMessagingWhatsappCommandController],
  providers: [SuperadminMessagingNotificationRepository, SuperadminMessagingNotificationService, SuperadminMessagingExportCompletionService, SuperadminMessagingTemplateInsightsService, SuperadminMessagingWhatsappBulkCenterService, SuperadminMessagingWhatsappCampaignService, SuperadminMessagingRepository, SuperadminMessagingListService, SuperadminMessagingFindService, SuperadminMessagingCreateService, SuperadminMessagingUpdateService, SuperadminMessagingDeleteService, SuperadminMessagingStatusService],
  exports: [SuperadminMessagingRepository],
})
/**
 * Primary Intent: Defines SuperadminMessagingModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminMessagingModule {}
