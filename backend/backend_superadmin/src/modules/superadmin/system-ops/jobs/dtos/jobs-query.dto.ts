// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the jobs feature.
// FLOW: HTTP query -> class-validator -> JobsListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationQueryDto } from '@/core/pagination/pagination-query.dto';

export class JobsQueryDto extends PaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}
