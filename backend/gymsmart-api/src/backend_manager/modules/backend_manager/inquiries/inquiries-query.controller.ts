// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { InquiriesFetchInquiriesResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-fetch-inquiries.response.dto';
import { InquiriesFetchInquiryByIdResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-fetch-inquiry-by-id.response.dto';
import { InquiriesFetchInquiryPlansSnapshotResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-fetch-inquiry-plans-snapshot.response.dto';
import { InquiriesFetchInquiryPlansResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-fetch-inquiry-plans.response.dto';
import { InquiriesFetchInquiryStatsResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-fetch-inquiry-stats.response.dto';
import { InquiriesQueryDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-query.dto';
import { InquiriesFetchInquiriesService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiries.service';
import { InquiriesFetchInquiryByIdService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-by-id.service';
import { InquiriesFetchInquiryPlansSnapshotService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-plans-snapshot.service';
import { InquiriesFetchInquiryPlansService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-plans.service';
import { InquiriesFetchInquiryStatsService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-fetch-inquiry-stats.service';

@Controller('manager')
@ApiTags('Manager inquiries')
@Roles(CoreRole.MANAGER)
export class InquiriesQueryController {
  constructor(private readonly fetchInquiriesService: InquiriesFetchInquiriesService, private readonly fetchInquiryPlansService: InquiriesFetchInquiryPlansService, private readonly fetchInquiryPlansSnapshotService: InquiriesFetchInquiryPlansSnapshotService, private readonly fetchInquiryByIdService: InquiriesFetchInquiryByIdService, private readonly fetchInquiryStatsService: InquiriesFetchInquiryStatsService) {}

  // SLA: STANDARD
  @Get("inquiries/plans")
  @ApiOperation({ summary: 'fetchInquiryPlans for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: [InquiriesFetchInquiryPlansResponseDto] })
  fetchInquiryPlans(@Query() query: InquiriesQueryDto): ReturnType<InquiriesFetchInquiryPlansService['fetchInquiryPlans']> { return this.fetchInquiryPlansService.fetchInquiryPlans(query as any); }


  // SLA: STANDARD
  @Get("inquiries/plans-snapshot")
  @ApiOperation({ summary: 'fetchInquiryPlansSnapshot for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: [InquiriesFetchInquiryPlansSnapshotResponseDto] })
  fetchInquiryPlansSnapshot(@Query() query: InquiriesQueryDto): ReturnType<InquiriesFetchInquiryPlansSnapshotService['fetchInquiryPlansSnapshot']> { return this.fetchInquiryPlansSnapshotService.fetchInquiryPlansSnapshot(query as any); }


  // SLA: FAST
  @Get("inquiries/stats")
  @ApiOperation({ summary: 'fetchInquiryStats for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesFetchInquiryStatsResponseDto })
  fetchInquiryStats(@Query() query: InquiriesQueryDto): ReturnType<InquiriesFetchInquiryStatsService['fetchInquiryStats']> { return this.fetchInquiryStatsService.fetchInquiryStats(query as any); }


  // SLA: STANDARD
  @Get("inquiries")
  @ApiOperation({ summary: 'fetchInquiries for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesFetchInquiriesResponseDto })
  fetchInquiries(@Query() query: InquiriesQueryDto): ReturnType<InquiriesFetchInquiriesService['fetchInquiries']> { return this.fetchInquiriesService.fetchInquiries(query as any); }


  // SLA: STANDARD
  @Get("inquiries/:id")
  @ApiOperation({ summary: 'fetchInquiryById for Manager inquiries' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesFetchInquiryByIdResponseDto })
  fetchInquiryById(@Param('id') id: string, @Query() query: InquiriesQueryDto): ReturnType<InquiriesFetchInquiryByIdService['fetchInquiryById']> { return this.fetchInquiryByIdService.fetchInquiryById(id, query as any); }


}
