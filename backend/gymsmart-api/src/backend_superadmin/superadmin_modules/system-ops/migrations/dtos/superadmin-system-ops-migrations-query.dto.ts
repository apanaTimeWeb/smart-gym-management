// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the migrations feature.
// FLOW: HTTP query -> class-validator -> SuperadminMigrationsListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SuperadminPaginationQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination-query.dto';

export class SuperadminMigrationsQueryDto extends SuperadminPaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}