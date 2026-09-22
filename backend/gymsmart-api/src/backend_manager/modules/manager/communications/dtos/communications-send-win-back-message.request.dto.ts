import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CommChannel, WinBackTemplateTier } from '@/backend_manager/modules/manager/communications/communications.constants';

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
