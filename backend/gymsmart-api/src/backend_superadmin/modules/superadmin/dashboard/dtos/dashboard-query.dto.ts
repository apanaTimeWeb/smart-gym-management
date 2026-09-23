// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the dashboard feature.
// FLOW: HTTP query -> class-validator -> DashboardListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationQueryDto } from '@/backend_superadmin/core/pagination/pagination-query.dto';

export class DashboardQueryDto extends PaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}