import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CommChannel, WinBackTemplateTier } from '@/modules/manager/communications/communications.constants';

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
