import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { IsString, IsUUID } from 'class-validator';
export class MembersAssignDietPlanRequestDto extends CoreRequestDto {
  @IsString() @IsUUID() dietPlanId!: string;
}
