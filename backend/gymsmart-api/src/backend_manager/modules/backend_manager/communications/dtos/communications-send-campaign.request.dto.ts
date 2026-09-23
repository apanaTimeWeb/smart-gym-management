// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsString, Min, IsInt } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { CommChannel, CommSegment } from '@/backend_manager/modules/backend_manager/communications/communications.constants';

export class CommunicationsSendCampaignRequestDto extends CoreRequestDto {
  @IsString() title!: string;
  @IsEnum(CommChannel) channel!: CommChannel;
  @IsEnum(CommSegment) segment!: CommSegment;
  @IsString() message!: string;
  @IsString() subject!: string;
  @IsInt() @Min(0) recipientCount!: number;
  @IsString() segmentLabel!: string;
}
