// RESPONSIBILITY: Validates the library HTTP input contract for one isolated use case.
// FLOW: HTTP body/query → TrainerLibraryDietPlanQueryDto → feature service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CorePaginationQueryDto } from '@/backend_trainer/backend_core/core_dtos/core-pagination-query.dto';
import { DietGoal } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enums';
import { Type } from 'class-transformer'; import { IsIn, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/**
 * Intent: Defines the TrainerLibraryDietPlanQueryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryDietPlanQueryDto extends CorePaginationQueryDto { @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() search?: string; @ApiPropertyOptional({ enum: DietGoal })
@IsOptional() @IsEnum(DietGoal) goal?: DietGoal; @ApiPropertyOptional({ default: "name" })
@IsOptional() @IsIn(['name','goal','calories']) sortBy = 'name'; @ApiPropertyOptional({ default: "asc" })
@IsOptional() @IsIn(['asc','desc']) sortDirection = 'asc'; }
