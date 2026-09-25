// RESPONSIBILITY: Defines the canonical 1-indexed pagination, sorting, and filtering request parameters.
// FLOW: Controller query → PaginationQueryDto validation → repository query.

import { Type 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-transformer'; import { IsInt, IsOptional, Max, Min, IsIn 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator'; export class CorePaginationQueryDto { @Type(()=>Number) @IsInt() @Min(1) page=1; @Type(()=>Number) @IsInt() @Min(1) @Max(100) limit=20; 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

