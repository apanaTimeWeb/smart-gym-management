// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the jobs feature.
// FLOW: HTTP query -> class-validator -> SuperadminJobsListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SuperadminPaginationQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination-query.dto';

export class SuperadminJobsQueryDto extends SuperadminPaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}