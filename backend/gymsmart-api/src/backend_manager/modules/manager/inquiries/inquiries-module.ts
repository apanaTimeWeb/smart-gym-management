// RESPONSIBILITY: Registers the isolated Manager inquiries feature boundary.
// FLOW: ManagerDomainModule -> InquiriesModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { InquiriesCommandController } from '@/modules/manager/inquiries/inquiries-command.controller';
import { InquiriesConvertLeadService } from '@/modules/manager/inquiries/services/inquiries-convert-lead.service';
import { InquiriesCreateInquiryService } from '@/modules/manager/inquiries/services/inquiries-create-inquiry.service';
import { InquiriesDeleteInquiryService } from '@/modules/manager/inquiries/services/inquiries-delete-inquiry.service';
import { InquiriesFetchInquiriesService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiries.service';
import { InquiriesFetchInquiryByIdService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-by-id.service';
import { InquiriesFetchInquiryPlansService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-plans.service';
import { InquiriesFetchInquiryPlansSnapshotService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-plans-snapshot.service';
import { InquiriesFetchInquiryStatsService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-stats.service';
import { InquiriesOrchestratorService } from '@/modules/manager/inquiries/services/inquiries-orchestrator.service';
import { InquiriesQueryController } from '@/modules/manager/inquiries/inquiries-query.controller';
import { InquiriesRepository } from '@/modules/manager/inquiries/repositories/inquiries-repository';
import { InquiriesUpdateInquiryService } from '@/modules/manager/inquiries/services/inquiries-update-inquiry.service';

@Module({
  controllers: [InquiriesQueryController, InquiriesCommandController],
  providers: [InquiriesConvertLeadService, InquiriesCreateInquiryService, InquiriesUpdateInquiryService, InquiriesDeleteInquiryService, InquiriesFetchInquiriesService, InquiriesFetchInquiryPlansService, InquiriesFetchInquiryPlansSnapshotService, InquiriesFetchInquiryByIdService, InquiriesFetchInquiryStatsService, InquiriesRepository, InquiriesOrchestratorService],
  exports: [InquiriesRepository],
})
export class InquiriesModule {}
