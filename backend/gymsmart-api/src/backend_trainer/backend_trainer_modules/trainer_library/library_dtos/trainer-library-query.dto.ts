// RESPONSIBILITY: Validates library filtering and sorting at the HTTP edge.
// FLOW: HTTP query → TrainerLibraryQueryDto → Library query service → repository.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { CorePaginationQueryDto } from '@/backend_trainer/backend_core/core_dtos/core-pagination-query.dto';
import { TrainerLibraryEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enum.mapper';
import { DietGoal } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enums';


/**
 * Intent: Defines the TrainerLibraryQueryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryQueryDto extends CorePaginationQueryDto {
  @ApiPropertyOptional({ type: String })
@IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ default: "desc" })
@IsIn(['asc', 'desc', 'ASC', 'DESC'])
  sortDirection = 'desc';

  @ApiPropertyOptional({ enum: DietGoal })
@IsOptional()
  @Transform(({ value }) => TrainerLibraryEnumMapper.toGoal(value))
  @IsEnum(DietGoal)
  goal?: DietGoal;

  @ApiPropertyOptional({ default: "name" })
@IsIn(['name', 'goal', 'calories'])
  sortBy = 'name';
}
