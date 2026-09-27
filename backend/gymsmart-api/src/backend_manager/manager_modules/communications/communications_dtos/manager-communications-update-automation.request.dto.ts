// RESPONSIBILITY: Owns the Manager communications request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsBoolean, IsEnum, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { CommAutomationType } from '@/backend_manager/manager_modules/communications/manager-communications.constants';
import { CommChannel } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

export class ManagerCommunicationsUpdateAutomationRequestDto extends CoreRequestDto {
  @IsEnum(CommAutomationType)
  @ApiProperty()
  type!: CommAutomationType;

  @IsString()
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  description!: string;

  @IsBoolean()
  @ApiProperty()
  enabled!: boolean;

  @IsEnum(CommChannel)
  @ApiProperty()
  channel!: CommChannel;

  @IsString()
  @ApiProperty()
  messageTemplate!: string;

  @IsString()
  @ApiProperty()
  sendTime!: string;

}

export { ManagerCommunicationsUpdateAutomationRequestDto as CommunicationsUpdateAutomationRequestDto };
