// RESPONSIBILITY: Validates paginated progress entry filtering and sorting parameters.
// FLOW: HTTP query → ProgressTrackingQueryDto → ProgressTrackingQueryService.

import { CorePaginationQueryDto 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { Type 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-transformer'; import { IsDateString, IsIn, IsInt, IsOptional, Max, Min 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator'; export class ProgressTrackingQueryDto extends CorePaginationQueryDto { @IsOptional() @IsDateString() startDate?:string; @IsOptional() @IsDateString() endDate?:string; @IsIn(['date','weightKg','heightCm','bmi','bodyFatPercent','muscleMassKg']) sortBy='date'; @IsIn(['asc','desc']) sortDirection='desc'; 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

