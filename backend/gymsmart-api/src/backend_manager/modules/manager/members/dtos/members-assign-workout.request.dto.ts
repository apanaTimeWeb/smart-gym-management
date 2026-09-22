import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { IsString, IsUUID } from 'class-validator';
export class MembersAssignWorkoutRequestDto extends CoreRequestDto {
  @IsString() @IsUUID() workoutId!: string;
}
