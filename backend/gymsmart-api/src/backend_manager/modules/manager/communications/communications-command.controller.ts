// RESPONSIBILITY: Owns the Manager communications command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { CommunicationsQueryDto } from '@/modules/manager/communications/dtos/communications-query.dto';
import { CommunicationsSendCampaignRequestDto } from '@/modules/manager/communications/dtos/communications-send-campaign.request.dto';
import { CommunicationsSendCampaignResponseDto } from '@/modules/manager/communications/dtos/communications-send-campaign.response.dto';
import { CommunicationsSendCampaignService } from '@/modules/manager/communications/services/communications-send-campaign.service';
import { CommunicationsSendWinBackMessageRequestDto } from '@/modules/manager/communications/dtos/communications-send-win-back-message.request.dto';
import { CommunicationsSendWinBackMessageResponseDto } from '@/modules/manager/communications/dtos/communications-send-win-back-message.response.dto';
import { CommunicationsSendWinBackMessageService } from '@/modules/manager/communications/services/communications-send-win-back-message.service';
import { CommunicationsUpdateAutomationRequestDto } from '@/modules/manager/communications/dtos/communications-update-automation.request.dto';
import { CommunicationsUpdateAutomationResponseDto } from '@/modules/manager/communications/dtos/communications-update-automation.response.dto';
import { CommunicationsUpdateAutomationService } from '@/modules/manager/communications/services/communications-update-automation.service';

@Controller('manager')
@ApiTags('Manager communications')
@Roles(CoreRole.MANAGER)
export class CommunicationsCommandController {
  constructor(private readonly sendCampaignService: CommunicationsSendCampaignService, private readonly updateAutomationService: CommunicationsUpdateAutomationService, private readonly sendWinBackMessageService: CommunicationsSendWinBackMessageService) {}

  // SLA: STANDARD
  @Post("communications/campaigns")
  @ApiOperation({ summary: 'sendCampaign for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: CommunicationsSendCampaignResponseDto })
  sendCampaign(@Body() dto: CommunicationsSendCampaignRequestDto): Promise<CommunicationsSendCampaignResponseDto> {  return this.sendCampaignService.sendCampaign(dto) as Promise<CommunicationsSendCampaignResponseDto>;  }


  // SLA: STANDARD
  @Post("communications/win-back")
  @ApiOperation({ summary: 'sendWinBackMessage for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: CommunicationsSendWinBackMessageResponseDto })
  sendWinBackMessage(@Body() dto: CommunicationsSendWinBackMessageRequestDto): Promise<CommunicationsSendWinBackMessageResponseDto> {  return this.sendWinBackMessageService.sendWinBackMessage(dto) as Promise<CommunicationsSendWinBackMessageResponseDto>;  }


  // SLA: STANDARD
  @Patch("communications/automations/:id")
  @ApiOperation({ summary: 'updateAutomation for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: CommunicationsUpdateAutomationResponseDto })
  updateAutomation(@Param('id') id: string, @Body() dto: CommunicationsUpdateAutomationRequestDto): Promise<CommunicationsUpdateAutomationResponseDto> {  return this.updateAutomationService.updateAutomation(dto, id) as Promise<CommunicationsUpdateAutomationResponseDto>;  }


}
