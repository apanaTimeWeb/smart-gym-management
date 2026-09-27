// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerLibraryMealItemResponseDto { @ApiPropertyOptional() time?: string; @ApiPropertyOptional() name?: string; @ApiPropertyOptional({type:Number}) calories?: number; @ApiPropertyOptional({type:[String]}) foods?: string[]; }
export { ManagerLibraryMealItemResponseDto as LibraryMealItemResponseDto };
