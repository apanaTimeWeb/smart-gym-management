// RESPONSIBILITY: Validates the exact Gyms V1 bulk-action request accepted by the frontend.
// FLOW: HTTP body -> class-validator -> GymsBulkActionService.
import { IsArray, IsIn, IsOptional, IsString, IsUUID, ArrayNotEmpty } from 'class-validator';

export class GymsBusinessControlsBulkActionDto {
  @IsIn(['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected'])
  action!: 'Send message' | 'Extend trial' | 'Export selected' | 'Move plan' | 'Suspend selected';

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  gymIds!: string[];

  @IsOptional()
  @IsString()
  targetPlan?: string;
}