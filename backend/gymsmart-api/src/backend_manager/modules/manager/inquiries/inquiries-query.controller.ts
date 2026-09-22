// RESPONSIBILITY: Owns the Manager inquiries query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { InquiriesFetchInquiriesResponseDto } from '@/modules/manager/inquiries/dtos/inquiries-fetch-inquiries.response.dto';
import { InquiriesFetchInquiriesService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiries.service';
import { InquiriesFetchInquiryByIdResponseDto } from '@/modules/manager/inquiries/dtos/inquiries-fetch-inquiry-by-id.response.dto';
import { InquiriesFetchInquiryByIdService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-by-id.service';
import { InquiriesFetchInquiryPlansResponseDto } from '@/modules/manager/inquiries/dtos/inquiries-fetch-inquiry-plans.response.dto';
import { InquiriesFetchInquiryPlansService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-plans.service';
import { InquiriesFetchInquiryPlansSnapshotResponseDto } from '@/modules/manager/inquiries/dtos/inquiries-fetch-inquiry-plans-snapshot.response.dto';
import { InquiriesFetchInquiryPlansSnapshotService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-plans-snapshot.service';
import { InquiriesFetchInquiryStatsResponseDto } from '@/modules/manager/inquiries/dtos/inquiries-fetch-inquiry-stats.response.dto';
import { InquiriesFetchInquiryStatsService } from '@/modules/manager/inquiries/services/inquiries-fetch-inquiry-stats.service';
import { InquiriesQueryDto } from '@/modules/manager/inquiries/dtos/inquiries-query.dto';

@Controller('manager')
@ApiTags('Manager inquiries')
@Roles(CoreRole.MANAGER)
export class InquiriesQueryController {
  constructor(private readonly fetchInquiriesService: InquiriesFetchInquiriesService, private readonly fetchInquiryPlansService: InquiriesFetchInquiryPlansService, private readonly fetchInquiryPlansSnapshotService: InquiriesFetchInquiryPlansSnapshotService, private readonly fetchInquiryByIdService: InquiriesFetchInquiryByIdService, private readonly fetchInquiryStatsService: InquiriesFetchInquiryStatsService) {}

  // SLA: STANDARD
  @Get("inquiries/plans")
  @ApiOperation({ summary: 'fetchInquiryPlans for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: [InquiriesFetchInquiryPlansResponseDto] })
  fetchInquiryPlans(@Query() query: InquiriesQueryDto): Promise<InquiriesFetchInquiryPlansResponseDto[]> {  return this.fetchInquiryPlansService.fetchInquiryPlans(query) as Promise<InquiriesFetchInquiryPlansResponseDto[]>;  }


  // SLA: STANDARD
  @Get("inquiries/plans-snapshot")
  @ApiOperation({ summary: 'fetchInquiryPlansSnapshot for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: [InquiriesFetchInquiryPlansSnapshotResponseDto] })
  fetchInquiryPlansSnapshot(@Query() query: InquiriesQueryDto): Promise<InquiriesFetchInquiryPlansSnapshotResponseDto[]> {  return this.fetchInquiryPlansSnapshotService.fetchInquiryPlansSnapshot(query) as Promise<InquiriesFetchInquiryPlansSnapshotResponseDto[]>;  }


  // SLA: FAST
  @Get("inquiries/stats")
  @ApiOperation({ summary: 'fetchInquiryStats for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesFetchInquiryStatsResponseDto })
  fetchInquiryStats(@Query() query: InquiriesQueryDto): Promise<InquiriesFetchInquiryStatsResponseDto> {  return this.fetchInquiryStatsService.fetchInquiryStats(query) as Promise<InquiriesFetchInquiryStatsResponseDto>;  }


  // SLA: STANDARD
  @Get("inquiries")
  @ApiOperation({ summary: 'fetchInquiries for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesFetchInquiriesResponseDto })
  fetchInquiries(@Query() query: InquiriesQueryDto): Promise<InquiriesFetchInquiriesResponseDto> {  return this.fetchInquiriesService.fetchInquiries(query) as Promise<InquiriesFetchInquiriesResponseDto>;  }


  // SLA: STANDARD
  @Get("inquiries/:id")
  @ApiOperation({ summary: 'fetchInquiryById for Manager inquiries' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesFetchInquiryByIdResponseDto })
  fetchInquiryById(@Param('id') id: string, @Query() query: InquiriesQueryDto): Promise<InquiriesFetchInquiryByIdResponseDto> {  return this.fetchInquiryByIdService.fetchInquiryById(id, query) as Promise<InquiriesFetchInquiryByIdResponseDto>;  }


}
