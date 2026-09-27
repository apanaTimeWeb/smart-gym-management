// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerInquiriesFetchInquiriesResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-fetch-inquiries.response.dto';
import { ManagerInquiriesFetchInquiryByIdResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-fetch-inquiry-by-id.response.dto';
import { ManagerInquiriesFetchInquiryPlansSnapshotResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-fetch-inquiry-plans-snapshot.response.dto';
import { ManagerInquiriesFetchInquiryPlansResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-fetch-inquiry-plans.response.dto';
import { ManagerInquiriesFetchInquiryStatsResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-fetch-inquiry-stats.response.dto';
import { ManagerInquiriesQueryDto } from '@/backend_manager/manager_modules/inquiries/inquiries_dtos/manager-inquiries-query.dto';
import { ManagerInquiriesFindInquiriesService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiries.service';
import { ManagerInquiriesFindInquiryByIdService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-by-id.service';
import { ManagerInquiriesFindInquiryPlansSnapshotService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-plans-snapshot.service';
import { ManagerInquiriesFindInquiryPlansService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-plans.service';
import { ManagerInquiriesFindInquiryStatsService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-find-inquiry-stats.service';

@Controller('manager')
@ApiTags('Manager inquiries')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerInquiriesQueryController {
  constructor(private readonly fetchInquiriesService: ManagerInquiriesFindInquiriesService, private readonly fetchInquiryPlansService: ManagerInquiriesFindInquiryPlansService, private readonly fetchInquiryPlansSnapshotService: ManagerInquiriesFindInquiryPlansSnapshotService, private readonly fetchInquiryByIdService: ManagerInquiriesFindInquiryByIdService, private readonly fetchInquiryStatsService: ManagerInquiriesFindInquiryStatsService) {}

  // SLA: STANDARD
  @Get("inquiries/plans")
  @ApiOperation({ summary: 'findInquiryPlans for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerInquiriesFetchInquiryPlansResponseDto] })
  findInquiryPlans(@Query() query: ManagerInquiriesQueryDto): ReturnType<ManagerInquiriesFindInquiryPlansService['findInquiryPlans']> { return this.fetchInquiryPlansService.findInquiryPlans(query); }


  // SLA: STANDARD
  @Get("inquiries/plans-snapshot")
  @ApiOperation({ summary: 'findInquiryPlansSnapshot for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerInquiriesFetchInquiryPlansSnapshotResponseDto] })
  findInquiryPlansSnapshot(@Query() query: ManagerInquiriesQueryDto): ReturnType<ManagerInquiriesFindInquiryPlansSnapshotService['findInquiryPlansSnapshot']> { return this.fetchInquiryPlansSnapshotService.findInquiryPlansSnapshot(query); }


  // SLA: FAST
  @Get("inquiries/stats")
  @ApiOperation({ summary: 'findInquiryStats for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerInquiriesFetchInquiryStatsResponseDto })
  findInquiryStats(@Query() query: ManagerInquiriesQueryDto): ReturnType<ManagerInquiriesFindInquiryStatsService['findInquiryStats']> { return this.fetchInquiryStatsService.findInquiryStats(query); }


  // SLA: STANDARD
  @Get("inquiries")
  @ApiOperation({ summary: 'findInquiries for Manager inquiries' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerInquiriesFetchInquiriesResponseDto })
  findInquiries(@Query() query: ManagerInquiriesQueryDto): ReturnType<ManagerInquiriesFindInquiriesService['findInquiries']> { return this.fetchInquiriesService.findInquiries(query); }


  // SLA: STANDARD
  @Get("inquiries/:id")
  @ApiOperation({ summary: 'findInquiryById for Manager inquiries' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerInquiriesFetchInquiryByIdResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  findInquiryById(@Param('id') id: string, @Query() query: ManagerInquiriesQueryDto): ReturnType<ManagerInquiriesFindInquiryByIdService['findInquiryById']> { return this.fetchInquiryByIdService.findInquiryById(id, query); }


}

export { ManagerInquiriesQueryController as InquiriesQueryController };
