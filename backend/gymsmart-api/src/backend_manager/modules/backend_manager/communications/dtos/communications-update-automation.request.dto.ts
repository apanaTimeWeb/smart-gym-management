// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsBoolean, IsEnum, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { CommAutomationType } from '@/backend_manager/modules/backend_manager/communications/communications.constants';
import { CommChannel } from '@/backend_manager/modules/backend_manager/communications/communications.constants';

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
