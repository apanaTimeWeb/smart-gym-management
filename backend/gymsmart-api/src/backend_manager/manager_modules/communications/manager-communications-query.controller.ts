// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerCommunicationsFetchAutomationsResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-fetch-automations.response.dto';
import { ManagerCommunicationsFetchCampaignsResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-fetch-campaigns.response.dto';
import { ManagerCommunicationsFetchChurnKPIsResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-fetch-churn-k-p-is.response.dto';
import { ManagerCommunicationsFetchChurnedMembersResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-fetch-churned-members.response.dto';
import { ManagerCommunicationsFetchCommunicationKPIsResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-fetch-communication-k-p-is.response.dto';
import { ManagerCommunicationsFetchSegmentRecipientsResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-fetch-segment-recipients.response.dto';
import { ManagerCommunicationsQueryDto } from '@/backend_manager/manager_modules/communications/communications_dtos/manager-communications-query.dto';
import { ManagerCommunicationsFindAutomationsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-automations.service';
import { ManagerCommunicationsFindCampaignsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-campaigns.service';
import { ManagerCommunicationsFindChurnKPIsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-churn-k-p-is.service';
import { ManagerCommunicationsFindChurnedMembersService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-churned-members.service';
import { ManagerCommunicationsFindCommunicationKPIsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-communication-k-p-is.service';
import { ManagerCommunicationsFindSegmentRecipientsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-find-segment-recipients.service';

@Controller('manager')
@ApiTags('Manager communications')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerCommunicationsQueryController {
  constructor(private readonly fetchCampaignsService: ManagerCommunicationsFindCampaignsService, private readonly fetchCommunicationKPIsService: ManagerCommunicationsFindCommunicationKPIsService, private readonly fetchSegmentRecipientsService: ManagerCommunicationsFindSegmentRecipientsService, private readonly fetchAutomationsService: ManagerCommunicationsFindAutomationsService, private readonly fetchChurnedMembersService: ManagerCommunicationsFindChurnedMembersService, private readonly fetchChurnKPIsService: ManagerCommunicationsFindChurnKPIsService) {}

  // SLA: STANDARD
  @Get("communications/automations")
  @ApiOperation({ summary: 'findAutomations for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerCommunicationsFetchAutomationsResponseDto] })
  findAutomations(@Query() query: ManagerCommunicationsQueryDto): ReturnType<ManagerCommunicationsFindAutomationsService['findAutomations']> { return this.fetchAutomationsService.findAutomations(query); }


  // SLA: STANDARD
  @Get("communications/campaigns")
  @ApiOperation({ summary: 'findCampaigns for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerCommunicationsFetchCampaignsResponseDto })
  findCampaigns(@Query() query: ManagerCommunicationsQueryDto): ReturnType<ManagerCommunicationsFindCampaignsService['findCampaigns']> { return this.fetchCampaignsService.findCampaigns(query); }


  // SLA: FAST
  @Get("communications/churn-kpis")
  @ApiOperation({ summary: 'findChurnKPIs for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerCommunicationsFetchChurnKPIsResponseDto })
  findChurnKPIs(@Query() query: ManagerCommunicationsQueryDto): ReturnType<ManagerCommunicationsFindChurnKPIsService['findChurnKPIs']> { return this.fetchChurnKPIsService.findChurnKPIs(query); }


  // SLA: STANDARD
  @Get("communications/churned-members")
  @ApiOperation({ summary: 'findChurnedMembers for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerCommunicationsFetchChurnedMembersResponseDto] })
  findChurnedMembers(@Query() query: ManagerCommunicationsQueryDto): ReturnType<ManagerCommunicationsFindChurnedMembersService['findChurnedMembers']> { return this.fetchChurnedMembersService.findChurnedMembers(query); }


  // SLA: FAST
  @Get("communications/kpis")
  @ApiOperation({ summary: 'findCommunicationKPIs for Manager communications' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerCommunicationsFetchCommunicationKPIsResponseDto })
  findCommunicationKPIs(@Query() query: ManagerCommunicationsQueryDto): ReturnType<ManagerCommunicationsFindCommunicationKPIsService['findCommunicationKPIs']> { return this.fetchCommunicationKPIsService.findCommunicationKPIs(query); }


  // SLA: STANDARD
  @Get("communications/segments/:segment")
  @ApiOperation({ summary: 'findSegmentRecipients for Manager communications' })
  @ApiParam({ name: 'segment', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerCommunicationsFetchSegmentRecipientsResponseDto] })
  findSegmentRecipients(@Param('segment') segment: string, @Query() query: ManagerCommunicationsQueryDto): ReturnType<ManagerCommunicationsFindSegmentRecipientsService['findSegmentRecipients']> { return this.fetchSegmentRecipientsService.findSegmentRecipients(segment, query); }


}

export { ManagerCommunicationsQueryController as CommunicationsQueryController };
