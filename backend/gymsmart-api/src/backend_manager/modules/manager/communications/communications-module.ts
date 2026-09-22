// RESPONSIBILITY: Registers the isolated Manager communications feature boundary.
// FLOW: ManagerDomainModule -> CommunicationsModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { CommunicationsCommandController } from '@/backend_manager/modules/manager/communications/communications-command.controller';
import { CommunicationsFetchAutomationsService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-automations.service';
import { CommunicationsFetchCampaignsService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-campaigns.service';
import { CommunicationsFetchChurnKPIsService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-churn-k-p-is.service';
import { CommunicationsFetchChurnedMembersService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-churned-members.service';
import { CommunicationsFetchCommunicationKPIsService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-communication-k-p-is.service';
import { CommunicationsFetchSegmentRecipientsService } from '@/backend_manager/modules/manager/communications/services/communications-fetch-segment-recipients.service';
import { CommunicationsOrchestratorService } from '@/backend_manager/modules/manager/communications/services/communications-orchestrator.service';
import { CommunicationsQueryController } from '@/backend_manager/modules/manager/communications/communications-query.controller';
import { CommunicationsRepository } from '@/backend_manager/modules/manager/communications/repositories/communications-repository';
import { CommunicationsSendCampaignService } from '@/backend_manager/modules/manager/communications/services/communications-send-campaign.service';
import { CommunicationsSendWinBackMessageService } from '@/backend_manager/modules/manager/communications/services/communications-send-win-back-message.service';
import { CommunicationsUpdateAutomationService } from '@/backend_manager/modules/manager/communications/services/communications-update-automation.service';

@Module({
  controllers: [CommunicationsQueryController, CommunicationsCommandController],
  providers: [CommunicationsSendCampaignService, CommunicationsUpdateAutomationService, CommunicationsSendWinBackMessageService, CommunicationsFetchCampaignsService, CommunicationsFetchCommunicationKPIsService, CommunicationsFetchSegmentRecipientsService, CommunicationsFetchAutomationsService, CommunicationsFetchChurnedMembersService, CommunicationsFetchChurnKPIsService, CommunicationsRepository, CommunicationsOrchestratorService],
  exports: [CommunicationsRepository],
})
export class CommunicationsModule {}
