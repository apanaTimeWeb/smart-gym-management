// RESPONSIBILITY: Validates the library HTTP input contract for one isolated use case.
// FLOW: HTTP body/query → LibraryDietPlanQueryDto → feature service.

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
import { DietGoal 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_trainer/modules/backend_trainer/library/library-enums';
import { Type 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-transformer'; import { IsIn, IsEnum, IsInt, IsOptional, IsString, Max, Min 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';
export class LibraryDietPlanQueryDto extends CorePaginationQueryDto { @IsOptional() @IsString() search?: string; @IsOptional() @IsEnum(DietGoal) goal?: DietGoal; @IsOptional() @IsIn(['name','goal','calories']) sortBy = 'name'; @IsOptional() @IsIn(['asc','desc']) sortDirection = 'asc'; 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

