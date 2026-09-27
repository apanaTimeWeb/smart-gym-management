// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerWorkoutCreateExerciseResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty({type:[String]}) muscleGroup!: string[]; @ApiProperty() equipment!: string; @ApiProperty() difficulty!: string; @ApiPropertyOptional() category?: string; @ApiPropertyOptional({type:Number}) sets?: number; @ApiPropertyOptional({type:Number}) reps?: number; @ApiPropertyOptional({type:Number}) duration?: number; @ApiPropertyOptional() description?: string; @ApiPropertyOptional() videoUrl?: string; @ApiProperty({type:Boolean}) isActive!: boolean; }
export { ManagerWorkoutCreateExerciseResponseDto as WorkoutCreateExerciseResponseDto };
