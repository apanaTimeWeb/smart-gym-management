// RESPONSIBILITY: Validates paginated progress entry filtering and sorting parameters.
// FLOW: HTTP query → TrainerProgressTrackingQueryDto → TrainerProgressTrackingQueryService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CorePaginationQueryDto } from '@/backend_trainer/backend_core/core_dtos/core-pagination-query.dto';
import { Type } from 'class-transformer'; import { IsDateString, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
 /**
 * Intent: Defines the TrainerProgressTrackingQueryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProgressTrackingQueryDto extends CorePaginationQueryDto { @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() startDate?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() endDate?:string; @ApiPropertyOptional({ default: "date" })
@IsIn(['date','weightKg','heightCm','bmi','bodyFatPercent','muscleMassKg']) sortBy='date'; @ApiPropertyOptional({ default: "desc" })
@IsIn(['asc','desc']) sortDirection='desc'; }
