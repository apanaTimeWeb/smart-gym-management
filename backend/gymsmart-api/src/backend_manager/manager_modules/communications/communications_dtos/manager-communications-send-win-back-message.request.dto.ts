// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEmail, IsEnum, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { CommChannel, WinBackTemplateTier } from '@/backend_manager/manager_modules/communications/manager-communications.constants';
import { CommunicationsDeliveryMedium } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

export class ManagerCommunicationsSendWinBackMessageRequestDto extends CoreRequestDto {
  @IsString() memberId!: string;
  @IsString() memberName!: string;
  @IsString() phone!: string;
  @IsEmail() email!: string;
  @IsEnum(CommChannel) channel!: CommChannel;
  @IsEnum(WinBackTemplateTier) templateTier!: WinBackTemplateTier;
  @IsString() message!: string;
  @IsString() subject!: string;
  @IsEnum(CommunicationsDeliveryMedium) deliveryMedium!: CommunicationsDeliveryMedium;
}

export { ManagerCommunicationsSendWinBackMessageRequestDto as CommunicationsSendWinBackMessageRequestDto };
