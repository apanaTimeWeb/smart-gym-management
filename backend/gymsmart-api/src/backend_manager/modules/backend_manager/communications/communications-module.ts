// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { CommunicationsCommandController } from '@/backend_manager/modules/backend_manager/communications/communications-command.controller';
import { CommunicationsQueryController } from '@/backend_manager/modules/backend_manager/communications/communications-query.controller';
import { CommunicationsRepository } from '@/backend_manager/modules/backend_manager/communications/repositories/communications-repository';
import { CommunicationsFetchAutomationsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-automations.service';
import { CommunicationsFetchCampaignsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-campaigns.service';
import { CommunicationsFetchChurnKPIsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-churn-k-p-is.service';
import { CommunicationsFetchChurnedMembersService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-churned-members.service';
import { CommunicationsFetchCommunicationKPIsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-communication-k-p-is.service';
import { CommunicationsFetchSegmentRecipientsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-segment-recipients.service';
import { CommunicationsOrchestratorService } from '@/backend_manager/modules/backend_manager/communications/services/communications-orchestrator.service';
import { CommunicationsSendCampaignService } from '@/backend_manager/modules/backend_manager/communications/services/communications-send-campaign.service';
import { CommunicationsSendWinBackMessageService } from '@/backend_manager/modules/backend_manager/communications/services/communications-send-win-back-message.service';
import { CommunicationsUpdateAutomationService } from '@/backend_manager/modules/backend_manager/communications/services/communications-update-automation.service';

@Module({
  controllers: [CommunicationsQueryController, CommunicationsCommandController],
  providers: [CommunicationsSendCampaignService, CommunicationsUpdateAutomationService, CommunicationsSendWinBackMessageService, CommunicationsFetchCampaignsService, CommunicationsFetchCommunicationKPIsService, CommunicationsFetchSegmentRecipientsService, CommunicationsFetchAutomationsService, CommunicationsFetchChurnedMembersService, CommunicationsFetchChurnKPIsService, CommunicationsRepository, CommunicationsOrchestratorService],
  exports: [CommunicationsRepository],
})
export class CommunicationsModule {}
