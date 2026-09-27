// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerLibraryUpdateDietPlanResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() goal!: string; @ApiPropertyOptional({type:Number}) calories?: number; @ApiPropertyOptional({type:Number}) protein?: number; @ApiPropertyOptional({type:Number}) carbs?: number; @ApiPropertyOptional({type:Number}) fats?: number; @ApiPropertyOptional() description?: string; @ApiProperty({type:[Object]}) meals!: Array<string|object>; @ApiProperty({type:Boolean}) isActive!: boolean; }
export { ManagerLibraryUpdateDietPlanResponseDto as LibraryUpdateDietPlanResponseDto };
