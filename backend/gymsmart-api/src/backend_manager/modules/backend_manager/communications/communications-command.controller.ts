// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { CommunicationsSendCampaignRequestDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-send-campaign.request.dto';
import { CommunicationsSendCampaignResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-send-campaign.response.dto';
import { CommunicationsSendWinBackMessageRequestDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-send-win-back-message.request.dto';
import { CommunicationsSendWinBackMessageResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-send-win-back-message.response.dto';
import { CommunicationsUpdateAutomationRequestDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-update-automation.request.dto';
import { CommunicationsUpdateAutomationResponseDto } from '@/backend_manager/modules/backend_manager/communications/dtos/communications-update-automation.response.dto';
import { CommunicationsSendCampaignService } from '@/backend_manager/modules/backend_manager/communications/services/communications-send-campaign.service';
import { CommunicationsSendWinBackMessageService } from '@/backend_manager/modules/backend_manager/communications/services/communications-send-win-back-message.service';
import { CommunicationsUpdateAutomationService } from '@/backend_manager/modules/backend_manager/communications/services/communications-update-automation.service';

@Controller('manager')
@ApiTags('Manager communications')
@Roles(CoreRole.MANAGER)
export class CommunicationsCommandController {
  constructor(private readonly sendCampaignService: CommunicationsSendCampaignService, private readonly updateAutomationService: CommunicationsUpdateAutomationService, private readonly sendWinBackMessageService: CommunicationsSendWinBackMessageService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("communications/campaigns")
  @ApiOperation({ summary: 'sendCampaign for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: CommunicationsSendCampaignResponseDto })
  sendCampaign(@Body() dto: CommunicationsSendCampaignRequestDto): ReturnType<CommunicationsSendCampaignService['sendCampaign']> { return this.sendCampaignService.sendCampaign(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("communications/win-back")
  @ApiOperation({ summary: 'sendWinBackMessage for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: CommunicationsSendWinBackMessageResponseDto })
  sendWinBackMessage(@Body() dto: CommunicationsSendWinBackMessageRequestDto): ReturnType<CommunicationsSendWinBackMessageService['sendWinBackMessage']> { return this.sendWinBackMessageService.sendWinBackMessage(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("communications/automations/:id")
  @ApiOperation({ summary: 'updateAutomation for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: CommunicationsUpdateAutomationResponseDto })
  updateAutomation(@Param('id') id: string, @Body() dto: CommunicationsUpdateAutomationRequestDto): ReturnType<CommunicationsUpdateAutomationService['updateAutomation']> { return this.updateAutomationService.updateAutomation(dto as any, id); }


}
