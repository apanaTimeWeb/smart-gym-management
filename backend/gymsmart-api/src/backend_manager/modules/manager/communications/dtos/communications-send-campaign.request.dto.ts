import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { CommChannel, CommSegment } from '@/backend_manager/modules/manager/communications/communications.constants';

export class CommunicationsSendCampaignRequestDto extends CoreRequestDto {
  @IsString() title!: string;
  @IsEnum(CommChannel) channel!: CommChannel;
  @IsEnum(CommSegment) segment!: CommSegment;
  @IsString() message!: string;
  @IsString() subject!: string;
  @IsInt() @Min(0) recipientCount!: number;
  @IsString() segmentLabel!: string;
}
