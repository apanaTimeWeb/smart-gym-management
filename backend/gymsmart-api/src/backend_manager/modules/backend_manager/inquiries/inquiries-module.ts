// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { InquiriesCommandController } from '@/backend_manager/modules/backend_manager/inquiries/inquiries-command.controller';
import { InquiriesQueryController } from '@/backend_manager/modules/backend_manager/inquiries/inquiries-query.controller';
import { InquiriesRepository } from '@/backend_manager/modules/backend_manager/inquiries/repositories/inquiries-repository';
import { InquiriesConvertLeadService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-convert-lead.service';
import { InquiriesCreateInquiryService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-create-inquiry.service';
import { InquiriesDeleteInquiryService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-delete-inquiry.service';
import { InquiriesFetchInquiriesService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiries.service';
import { InquiriesFetchInquiryByIdService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-by-id.service';
import { InquiriesFetchInquiryPlansSnapshotService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-plans-snapshot.service';
import { InquiriesFetchInquiryPlansService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-plans.service';
import { InquiriesFetchInquiryStatsService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-stats.service';
import { InquiriesOrchestratorService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-orchestrator.service';
import { InquiriesUpdateInquiryService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-update-inquiry.service';

@Module({
  controllers: [InquiriesQueryController, InquiriesCommandController],
  providers: [InquiriesConvertLeadService, InquiriesCreateInquiryService, InquiriesUpdateInquiryService, InquiriesDeleteInquiryService, InquiriesFetchInquiriesService, InquiriesFetchInquiryPlansService, InquiriesFetchInquiryPlansSnapshotService, InquiriesFetchInquiryByIdService, InquiriesFetchInquiryStatsService, InquiriesRepository, InquiriesOrchestratorService],
  exports: [InquiriesRepository],
})
export class InquiriesModule {}
