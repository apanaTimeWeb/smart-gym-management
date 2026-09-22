import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { IsString, IsUUID } from 'class-validator';
export class MembersAssignDietPlanRequestDto extends CoreRequestDto {
  @IsString() @IsUUID() dietPlanId!: string;
}
