import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { IsString, IsUUID } from 'class-validator';
export class ReferralsClaimRewardRequestDto extends CoreRequestDto {
  @IsString() @IsUUID() referralId!: string;
}
