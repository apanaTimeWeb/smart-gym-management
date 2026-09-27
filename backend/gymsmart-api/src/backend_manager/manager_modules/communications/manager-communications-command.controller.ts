// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerCommunicationsSendCampaignRequestDto } from '@/backend_manager/manager_modules/communications/communications_dtos/manager-communications-send-campaign.request.dto';
import { ManagerCommunicationsSendCampaignResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-send-campaign.response.dto';
import { ManagerCommunicationsSendWinBackMessageRequestDto } from '@/backend_manager/manager_modules/communications/communications_dtos/manager-communications-send-win-back-message.request.dto';
import { ManagerCommunicationsSendWinBackMessageResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-send-win-back-message.response.dto';
import { ManagerCommunicationsUpdateAutomationRequestDto } from '@/backend_manager/manager_modules/communications/communications_dtos/manager-communications-update-automation.request.dto';
import { ManagerCommunicationsUpdateAutomationResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-update-automation.response.dto';
import { ManagerCommunicationsSendCampaignService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-send-campaign.service';
import { ManagerCommunicationsSendWinBackMessageService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-send-win-back-message.service';
import { ManagerCommunicationsUpdateAutomationService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-update-automation.service';

@Controller('manager')
@ApiTags('Manager communications')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerCommunicationsCommandController {
  constructor(private readonly sendCampaignService: ManagerCommunicationsSendCampaignService, private readonly updateAutomationService: ManagerCommunicationsUpdateAutomationService, private readonly sendWinBackMessageService: ManagerCommunicationsSendWinBackMessageService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("communications/campaigns")
  @ApiOperation({ summary: 'createCampaign for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerCommunicationsSendCampaignResponseDto })
  createCampaign(@Body() dto: ManagerCommunicationsSendCampaignRequestDto): ReturnType<ManagerCommunicationsSendCampaignService['createCampaign']> { return this.sendCampaignService.createCampaign(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("communications/win-back")
  @ApiOperation({ summary: 'createWinBackMessage for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerCommunicationsSendWinBackMessageResponseDto })
  createWinBackMessage(@Body() dto: ManagerCommunicationsSendWinBackMessageRequestDto): ReturnType<ManagerCommunicationsSendWinBackMessageService['createWinBackMessage']> { return this.sendWinBackMessageService.createWinBackMessage(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("communications/automations/:id")
  @ApiOperation({ summary: 'updateAutomation for Manager communications' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerCommunicationsUpdateAutomationResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateAutomation(@Param('id') id: string, @Body() dto: ManagerCommunicationsUpdateAutomationRequestDto): ReturnType<ManagerCommunicationsUpdateAutomationService['updateAutomation']> { return this.updateAutomationService.updateAutomation(dto, id); }


}

export { ManagerCommunicationsCommandController as CommunicationsCommandController };
