// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerCommunicationsMutationService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerCommunicationsAuthorizationService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-authorization.service';

import { ManagerCommunicationsCommandController } from '@/backend_manager/manager_modules/communications/manager-communications-command.controller';
import { ManagerCommunicationsQueryController } from '@/backend_manager/manager_modules/communications/manager-communications-query.controller';
import { ManagerCommunicationsRepository } from '@/backend_manager/manager_modules/communications/manager-communications.repository';
import { ManagerCommunicationsDeliveryJobRepository } from '@/backend_manager/manager_modules/communications/communications_repositories/manager-communications-delivery-job.repository';
import { ManagerCommunicationsDeliveryAdapter } from '@/backend_manager/manager_modules/communications/communications_adapters/manager-communications-delivery.adapter';
import { ManagerCommunicationsProcessDeliveryJobsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-process-delivery-jobs.service';
import { ManagerCommunicationsFindAutomationsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-automations.service';
import { ManagerCommunicationsFindCampaignsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-campaigns.service';
import { ManagerCommunicationsFindChurnKPIsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-churn-k-p-is.service';
import { ManagerCommunicationsFindChurnedMembersService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-churned-members.service';
import { ManagerCommunicationsFindCommunicationKPIsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-communication-k-p-is.service';
import { ManagerCommunicationsFindSegmentRecipientsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-segment-recipients.service';
import { ManagerCommunicationsOrchestratorService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-orchestrator.service';
import { ManagerCommunicationsSendCampaignService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-send-campaign.service';
import { ManagerCommunicationsSendWinBackMessageService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-send-win-back-message.service';
import { ManagerCommunicationsUpdateAutomationService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-update-automation.service';

@Module({
  controllers: [ManagerCommunicationsQueryController, ManagerCommunicationsCommandController],
  providers: [ManagerCommunicationsMutationService, ManagerCommunicationsSendCampaignService, ManagerCommunicationsUpdateAutomationService, ManagerCommunicationsSendWinBackMessageService, ManagerCommunicationsFindCampaignsService, ManagerCommunicationsFindCommunicationKPIsService, ManagerCommunicationsFindSegmentRecipientsService, ManagerCommunicationsFindAutomationsService, ManagerCommunicationsFindChurnedMembersService, ManagerCommunicationsFindChurnKPIsService, ManagerCommunicationsRepository, ManagerCommunicationsDeliveryJobRepository, ManagerCommunicationsDeliveryAdapter, ManagerCommunicationsProcessDeliveryJobsService, ManagerCommunicationsOrchestratorService,
  ManagerCommunicationsAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:communications`, useFactory: (authorization: ManagerCommunicationsAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('communications', authorization); return authorization; }, inject: [ManagerCommunicationsAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerCommunicationsRepository],
})
export class ManagerCommunicationsModule {}

export { ManagerCommunicationsModule as CommunicationsModule };
