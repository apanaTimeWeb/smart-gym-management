// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerLibraryCreateExerciseResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() category!: string; @ApiPropertyOptional({type:[String]}) muscleGroup?: string[]; @ApiPropertyOptional({type:Number}) sets?: number; @ApiPropertyOptional({type:Number}) reps?: number; @ApiPropertyOptional({type:Number}) duration?: number; @ApiProperty() difficulty!: string; @ApiPropertyOptional() description?: string; @ApiPropertyOptional() videoUrl?: string; @ApiProperty({type:Boolean}) isActive!: boolean; }
export { ManagerLibraryCreateExerciseResponseDto as LibraryCreateExerciseResponseDto };
