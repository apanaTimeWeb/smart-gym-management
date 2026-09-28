// RESPONSIBILITY: Validates Trainer Dashboard reporting-range query semantics.
// FLOW: HTTP query → TrainerDashboardQueryDto → widget query service → widget repository.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional } from 'class-validator';


/**
 * Intent: Defines the TrainerDashboardQueryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerDashboardQueryDto {
  @ApiPropertyOptional({ default: "this_month" })
@IsIn(['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'custom'])
  range = 'this_month';

  @ApiPropertyOptional({ type: String })
@IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ type: String })
@IsOptional()
  @IsDateString()
  endDate?: string;
}
