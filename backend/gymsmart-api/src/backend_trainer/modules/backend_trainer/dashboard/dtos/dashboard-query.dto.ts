// RESPONSIBILITY: Validates Trainer Dashboard reporting-range query semantics.
// FLOW: HTTP query → DashboardQueryDto → DashboardStatsService → DashboardRepository.

import { IsDateString, IsIn, IsOptional} from 'class-validator';

export class DashboardQueryDto {
  @IsIn(['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'custom'])
  range = 'this_month';

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;}

