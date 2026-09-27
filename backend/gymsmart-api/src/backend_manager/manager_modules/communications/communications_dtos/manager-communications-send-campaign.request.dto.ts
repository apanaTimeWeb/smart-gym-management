// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsString, Min, IsInt } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { CommChannel, CommSegment } from '@/backend_manager/manager_modules/communications/manager-communications.constants';
import { CommunicationsDeliveryMedium } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

export class ManagerCommunicationsSendCampaignRequestDto extends CoreRequestDto {
  @IsString() title!: string;
  @IsEnum(CommChannel) channel!: CommChannel;
  @IsEnum(CommSegment) segment!: CommSegment;
  @IsString() message!: string;
  @IsString() subject!: string;
  @IsInt() @Min(0) recipientCount!: number;
  @IsString() segmentLabel!: string;
  @IsEnum(CommunicationsDeliveryMedium) deliveryMedium!: CommunicationsDeliveryMedium;
}

export { ManagerCommunicationsSendCampaignRequestDto as CommunicationsSendCampaignRequestDto };
