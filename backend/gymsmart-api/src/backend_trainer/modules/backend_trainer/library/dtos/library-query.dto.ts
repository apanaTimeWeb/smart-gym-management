// RESPONSIBILITY: Validates library request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → LibraryQueryDto → service.

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
} from 'class-transformer'; import { IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';
export class LibraryQueryDto extends CorePaginationQueryDto {
    @IsOptional() @IsString() search?:string;
    @IsIn(['asc','desc','ASC','DESC']) sortDirection='desc';
    @IsOptional() @IsEnum(DietGoal) goal?:DietGoal; @IsIn(['name','goal','calories']) sortBy='name';


  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

