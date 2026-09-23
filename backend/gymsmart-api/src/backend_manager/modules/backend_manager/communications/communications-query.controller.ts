// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { CommunicationsFetchAutomationsResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-fetch-automations.response.dto';
import { CommunicationsFetchCampaignsResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-fetch-campaigns.response.dto';
import { CommunicationsFetchChurnKPIsResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-fetch-churn-k-p-is.response.dto';
import { CommunicationsFetchChurnedMembersResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-fetch-churned-members.response.dto';
import { CommunicationsFetchCommunicationKPIsResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-fetch-communication-k-p-is.response.dto';
import { CommunicationsFetchSegmentRecipientsResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-fetch-segment-recipients.response.dto';
import { CommunicationsQueryDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-query.dto';
import { CommunicationsFetchAutomationsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-automations.service';
import { CommunicationsFetchCampaignsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-campaigns.service';
import { CommunicationsFetchChurnKPIsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-churn-k-p-is.service';
import { CommunicationsFetchChurnedMembersService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-churned-members.service';
import { CommunicationsFetchCommunicationKPIsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-communication-k-p-is.service';
import { CommunicationsFetchSegmentRecipientsService } from '@/backend_manager/modules/backend_manager/communications/services/communications-fetch-segment-recipients.service';

@Controller('manager')
@ApiTags('Manager communications')
@Roles(CoreRole.MANAGER)
export class CommunicationsQueryController {
  constructor(private readonly fetchCampaignsService: CommunicationsFetchCampaignsService, private readonly fetchCommunicationKPIsService: CommunicationsFetchCommunicationKPIsService, private readonly fetchSegmentRecipientsService: CommunicationsFetchSegmentRecipientsService, private readonly fetchAutomationsService: CommunicationsFetchAutomationsService, private readonly fetchChurnedMembersService: CommunicationsFetchChurnedMembersService, private readonly fetchChurnKPIsService: CommunicationsFetchChurnKPIsService) {}

  // SLA: STANDARD
  @Get("communications/automations")
  @ApiOperation({ summary: 'fetchAutomations for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: [CommunicationsFetchAutomationsResponseDto] })
  fetchAutomations(@Query() query: CommunicationsQueryDto): ReturnType<CommunicationsFetchAutomationsService['fetchAutomations']> { return this.fetchAutomationsService.fetchAutomations(query as any); }


  // SLA: STANDARD
  @Get("communications/campaigns")
  @ApiOperation({ summary: 'fetchCampaigns for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: CommunicationsFetchCampaignsResponseDto })
  fetchCampaigns(@Query() query: CommunicationsQueryDto): ReturnType<CommunicationsFetchCampaignsService['fetchCampaigns']> { return this.fetchCampaignsService.fetchCampaigns(query as any); }


  // SLA: FAST
  @Get("communications/churn-kpis")
  @ApiOperation({ summary: 'fetchChurnKPIs for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: CommunicationsFetchChurnKPIsResponseDto })
  fetchChurnKPIs(@Query() query: CommunicationsQueryDto): ReturnType<CommunicationsFetchChurnKPIsService['fetchChurnKPIs']> { return this.fetchChurnKPIsService.fetchChurnKPIs(query as any); }


  // SLA: STANDARD
  @Get("communications/churned-members")
  @ApiOperation({ summary: 'fetchChurnedMembers for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: [CommunicationsFetchChurnedMembersResponseDto] })
  fetchChurnedMembers(@Query() query: CommunicationsQueryDto): ReturnType<CommunicationsFetchChurnedMembersService['fetchChurnedMembers']> { return this.fetchChurnedMembersService.fetchChurnedMembers(query as any); }


  // SLA: FAST
  @Get("communications/kpis")
  @ApiOperation({ summary: 'fetchCommunicationKPIs for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: CommunicationsFetchCommunicationKPIsResponseDto })
  fetchCommunicationKPIs(@Query() query: CommunicationsQueryDto): ReturnType<CommunicationsFetchCommunicationKPIsService['fetchCommunicationKPIs']> { return this.fetchCommunicationKPIsService.fetchCommunicationKPIs(query as any); }


  // SLA: STANDARD
  @Get("communications/segments/:segment")
  @ApiOperation({ summary: 'fetchSegmentRecipients for Manager communications' })
  @ApiParam({ name: 'segment', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [CommunicationsFetchSegmentRecipientsResponseDto] })
  fetchSegmentRecipients(@Param('segment') segment: string, @Query() query: CommunicationsQueryDto): ReturnType<CommunicationsFetchSegmentRecipientsService['fetchSegmentRecipients']> { return this.fetchSegmentRecipientsService.fetchSegmentRecipients(segment, query as any); }


}
