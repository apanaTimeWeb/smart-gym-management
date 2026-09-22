import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/communications/automations/:id.
// FLOW: HTTP payload -> CommunicationsUpdateAutomationRequestDto validation -> write use case -> orchestrator.

import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { CommAutomationType } from '@/backend_manager/modules/manager/communications/communications.constants';
import { CommChannel } from '@/backend_manager/modules/manager/communications/communications.constants';

export class CommunicationsUpdateAutomationRequestDto extends CoreRequestDto {
  @IsEnum(CommAutomationType)
  type!: CommAutomationType;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsBoolean()
  enabled!: boolean;

  @IsEnum(CommChannel)
  channel!: CommChannel;

  @IsString()
  messageTemplate!: string;

  @IsString()
  sendTime!: string;

}
