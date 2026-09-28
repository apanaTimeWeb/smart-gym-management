// RESPONSIBILITY: Validates session date/status filters and sorting at the HTTP edge.
// FLOW: HTTP query → TrainerSessionsQueryDto → TrainerSessionsQueryService → repository.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsIn, IsOptional } from 'class-validator';
import { CorePaginationQueryDto } from '@/backend_trainer/backend_core/core_dtos/core-pagination-query.dto';
import { TrainerSessionsEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enum.mapper';
import { SessionStatus } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';


/**
 * Intent: Defines the TrainerSessionsQueryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsQueryDto extends CorePaginationQueryDto {
  @ApiPropertyOptional({ type: String })
@IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ type: String })
@IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ type: String })
@IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ enum: SessionStatus })
@IsOptional()
  @Transform(({ value }) => TrainerSessionsEnumMapper.toStatus(value))
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @ApiPropertyOptional({ default: "sessionDate" })
@IsIn(['sessionDate', 'time', 'status'])
  sortBy = 'sessionDate';

  @ApiPropertyOptional({ default: "asc" })
@IsIn(['asc', 'desc'])
  sortDirection = 'asc';
}
