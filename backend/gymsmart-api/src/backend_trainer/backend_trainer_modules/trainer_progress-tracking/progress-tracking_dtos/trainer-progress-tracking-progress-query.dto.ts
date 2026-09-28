// RESPONSIBILITY: Validates progress-tracking request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerProgressTrackingProgressQueryDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CorePaginationQueryDto } from '@/backend_trainer/backend_core/core_dtos/core-pagination-query.dto';
import { Type } from 'class-transformer'; import { IsDateString, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

/**
 * Intent: Defines the TrainerProgressTrackingProgressQueryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProgressTrackingProgressQueryDto extends CorePaginationQueryDto { @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() startDate?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() endDate?:string; @ApiPropertyOptional({ default: "date" })
@IsIn(['date','weightKg','bmi']) sortBy='date'; @ApiPropertyOptional({ default: "desc" })
@IsIn(['asc','desc']) sortDirection='desc';
}
