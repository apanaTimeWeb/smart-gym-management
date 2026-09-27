// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerInquiriesMutationService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerInquiriesAuthorizationService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-authorization.service';

import { ManagerInquiriesCommandController } from '@/backend_manager/manager_modules/inquiries/manager-inquiries-command.controller';
import { ManagerInquiriesQueryController } from '@/backend_manager/manager_modules/inquiries/manager-inquiries-query.controller';
import { ManagerInquiriesRepository } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.repository';
import { ManagerInquiriesConvertLeadService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-convert-lead.service';
import { ManagerInquiriesCreateInquiryService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-create-inquiry.service';
import { ManagerInquiriesDeleteInquiryService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-delete-inquiry.service';
import { ManagerInquiriesFindInquiriesService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiries.service';
import { ManagerInquiriesFindInquiryByIdService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-by-id.service';
import { ManagerInquiriesFindInquiryPlansSnapshotService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-plans-snapshot.service';
import { ManagerInquiriesFindInquiryPlansService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-plans.service';
import { ManagerInquiriesFindInquiryStatsService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-stats.service';
import { ManagerInquiriesOrchestratorService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-orchestrator.service';
import { ManagerInquiriesUpdateInquiryService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-update-inquiry.service';

@Module({
  controllers: [ManagerInquiriesQueryController, ManagerInquiriesCommandController],
  providers: [ManagerInquiriesMutationService, ManagerInquiriesConvertLeadService, ManagerInquiriesCreateInquiryService, ManagerInquiriesUpdateInquiryService, ManagerInquiriesDeleteInquiryService, ManagerInquiriesFindInquiriesService, ManagerInquiriesFindInquiryPlansService, ManagerInquiriesFindInquiryPlansSnapshotService, ManagerInquiriesFindInquiryByIdService, ManagerInquiriesFindInquiryStatsService, ManagerInquiriesRepository, ManagerInquiriesOrchestratorService,
  ManagerInquiriesAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:inquiries`, useFactory: (authorization: ManagerInquiriesAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('inquiries', authorization); return authorization; }, inject: [ManagerInquiriesAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerInquiriesRepository],
})
export class ManagerInquiriesModule {}

export { ManagerInquiriesModule as InquiriesModule };
