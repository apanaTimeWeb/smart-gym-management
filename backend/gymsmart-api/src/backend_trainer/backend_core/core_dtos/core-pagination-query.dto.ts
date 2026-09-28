// RESPONSIBILITY: Defines the canonical 1-indexed pagination, sorting, and filtering request parameters.
// FLOW: Controller query → PaginationQueryDto validation → repository query.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer'; import { IsInt, IsOptional, Max, Min, IsIn } from 'class-validator';
 /**
 * Intent: Defines the CorePaginationQueryDto boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CorePaginationQueryDto { @ApiPropertyOptional({ default: 1 })
@Type(()=>Number) @IsInt() @Min(1) page=1; @ApiPropertyOptional({ default: 20 })
@Type(()=>Number) @IsInt() @Min(1) @Max(100) limit=20; }
