// RESPONSIBILITY: Owns the Manager communications query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { CommunicationsFetchAutomationsResponseDto } from '@/modules/manager/communications/dtos/communications-fetch-automations.response.dto';
import { CommunicationsFetchAutomationsService } from '@/modules/manager/communications/services/communications-fetch-automations.service';
import { CommunicationsFetchCampaignsResponseDto } from '@/modules/manager/communications/dtos/communications-fetch-campaigns.response.dto';
import { CommunicationsFetchCampaignsService } from '@/modules/manager/communications/services/communications-fetch-campaigns.service';
import { CommunicationsFetchChurnKPIsResponseDto } from '@/modules/manager/communications/dtos/communications-fetch-churn-k-p-is.response.dto';
import { CommunicationsFetchChurnKPIsService } from '@/modules/manager/communications/services/communications-fetch-churn-k-p-is.service';
import { CommunicationsFetchChurnedMembersResponseDto } from '@/modules/manager/communications/dtos/communications-fetch-churned-members.response.dto';
import { CommunicationsFetchChurnedMembersService } from '@/modules/manager/communications/services/communications-fetch-churned-members.service';
import { CommunicationsFetchCommunicationKPIsResponseDto } from '@/modules/manager/communications/dtos/communications-fetch-communication-k-p-is.response.dto';
import { CommunicationsFetchCommunicationKPIsService } from '@/modules/manager/communications/services/communications-fetch-communication-k-p-is.service';
import { CommunicationsFetchSegmentRecipientsResponseDto } from '@/modules/manager/communications/dtos/communications-fetch-segment-recipients.response.dto';
import { CommunicationsFetchSegmentRecipientsService } from '@/modules/manager/communications/services/communications-fetch-segment-recipients.service';
import { CommunicationsQueryDto } from '@/modules/manager/communications/dtos/communications-query.dto';

@Controller('manager')
@ApiTags('Manager communications')
@Roles(CoreRole.MANAGER)
export class CommunicationsQueryController {
  constructor(private readonly fetchCampaignsService: CommunicationsFetchCampaignsService, private readonly fetchCommunicationKPIsService: CommunicationsFetchCommunicationKPIsService, private readonly fetchSegmentRecipientsService: CommunicationsFetchSegmentRecipientsService, private readonly fetchAutomationsService: CommunicationsFetchAutomationsService, private readonly fetchChurnedMembersService: CommunicationsFetchChurnedMembersService, private readonly fetchChurnKPIsService: CommunicationsFetchChurnKPIsService) {}

  // SLA: STANDARD
  @Get("communications/automations")
  @ApiOperation({ summary: 'fetchAutomations for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: [CommunicationsFetchAutomationsResponseDto] })
  fetchAutomations(@Query() query: CommunicationsQueryDto): Promise<CommunicationsFetchAutomationsResponseDto[]> {  return this.fetchAutomationsService.fetchAutomations(query) as Promise<CommunicationsFetchAutomationsResponseDto[]>;  }


  // SLA: STANDARD
  @Get("communications/campaigns")
  @ApiOperation({ summary: 'fetchCampaigns for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: CommunicationsFetchCampaignsResponseDto })
  fetchCampaigns(@Query() query: CommunicationsQueryDto): Promise<CommunicationsFetchCampaignsResponseDto> {  return this.fetchCampaignsService.fetchCampaigns(query) as Promise<CommunicationsFetchCampaignsResponseDto>;  }


  // SLA: FAST
  @Get("communications/churn-kpis")
  @ApiOperation({ summary: 'fetchChurnKPIs for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: CommunicationsFetchChurnKPIsResponseDto })
  fetchChurnKPIs(@Query() query: CommunicationsQueryDto): Promise<CommunicationsFetchChurnKPIsResponseDto> {  return this.fetchChurnKPIsService.fetchChurnKPIs(query) as Promise<CommunicationsFetchChurnKPIsResponseDto>;  }


  // SLA: STANDARD
  @Get("communications/churned-members")
  @ApiOperation({ summary: 'fetchChurnedMembers for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: [CommunicationsFetchChurnedMembersResponseDto] })
  fetchChurnedMembers(@Query() query: CommunicationsQueryDto): Promise<CommunicationsFetchChurnedMembersResponseDto[]> {  return this.fetchChurnedMembersService.fetchChurnedMembers(query) as Promise<CommunicationsFetchChurnedMembersResponseDto[]>;  }


  // SLA: FAST
  @Get("communications/kpis")
  @ApiOperation({ summary: 'fetchCommunicationKPIs for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: CommunicationsFetchCommunicationKPIsResponseDto })
  fetchCommunicationKPIs(@Query() query: CommunicationsQueryDto): Promise<CommunicationsFetchCommunicationKPIsResponseDto> {  return this.fetchCommunicationKPIsService.fetchCommunicationKPIs(query) as Promise<CommunicationsFetchCommunicationKPIsResponseDto>;  }


  // SLA: STANDARD
  @Get("communications/segments/:segment")
  @ApiOperation({ summary: 'fetchSegmentRecipients for Manager communications' })
  @ApiParam({ name: 'segment', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [CommunicationsFetchSegmentRecipientsResponseDto] })
  fetchSegmentRecipients(@Param('segment') segment: string, @Query() query: CommunicationsQueryDto): Promise<CommunicationsFetchSegmentRecipientsResponseDto[]> {  return this.fetchSegmentRecipientsService.fetchSegmentRecipients(segment, query) as Promise<CommunicationsFetchSegmentRecipientsResponseDto[]>;  }


}
