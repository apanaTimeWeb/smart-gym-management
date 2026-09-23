// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEmail, IsEnum, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { CommChannel, WinBackTemplateTier } from '@/backend_manager/modules/backend_manager/communications/communications.constants';

export class CommunicationsSendWinBackMessageRequestDto extends CoreRequestDto {
  @IsString() memberId!: string;
  @IsString() memberName!: string;
  @IsString() phone!: string;
  @IsEmail() email!: string;
  @IsEnum(CommChannel) channel!: CommChannel;
  @IsEnum(WinBackTemplateTier) templateTier!: WinBackTemplateTier;
  @IsString() message!: string;
  @IsString() subject!: string;
}
