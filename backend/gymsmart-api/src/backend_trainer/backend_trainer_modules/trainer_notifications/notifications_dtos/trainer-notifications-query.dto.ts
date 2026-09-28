// RESPONSIBILITY: Validates notifications request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerNotificationsQueryDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CorePaginationQueryDto } from '@/backend_trainer/backend_core/core_dtos/core-pagination-query.dto';
import { Type } from 'class-transformer'; import { IsBoolean, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID } from 'class-validator';

/**
 * Intent: Defines the TrainerNotificationsQueryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerNotificationsQueryDto extends CorePaginationQueryDto {
    @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() search?:string;
    @ApiPropertyOptional({ default: "desc", type: String })
@IsIn(['asc','desc','ASC','DESC']) sortDirection: 'asc'|'desc'|'ASC'|'DESC' = 'desc';
    @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() unreadOnly?:boolean;
    @ApiPropertyOptional({ default: "createdAt", type: String })
@IsIn(['createdAt','title']) sortBy: 'createdAt'|'title' = 'createdAt';
}
