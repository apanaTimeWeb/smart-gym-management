// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LibraryMealItemResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-meal-item.response.dto';
export class ManagerLibraryDietPlanItemResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() goal!: string; @ApiPropertyOptional({type:Number}) calories?: number; @ApiPropertyOptional({type:Number}) protein?: number; @ApiPropertyOptional({type:Number}) carbs?: number; @ApiPropertyOptional({type:Number}) fats?: number; @ApiPropertyOptional() description?: string; @ApiProperty({type:[Object]}) meals!: Array<string|LibraryMealItemResponseDto>; @ApiProperty({type:Boolean}) isActive!: boolean; }
export { ManagerLibraryDietPlanItemResponseDto as LibraryDietPlanItemResponseDto };
