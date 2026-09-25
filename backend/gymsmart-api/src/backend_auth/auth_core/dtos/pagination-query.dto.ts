// RESPONSIBILITY: Validates canonical one-indexed pagination query parameters for all paginated endpoints.
// FLOW: HTTP query -> PaginationQueryDto -> repository/query service.

import { Type} from 'class-transformer';
import { IsInt, IsOptional, Max, Min} from 'class-validator';
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;}

