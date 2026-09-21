// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the gyms feature.
// FLOW: HTTP query -> class-validator -> GymsListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationQueryDto } from '@/backend_superadmin/core/pagination/pagination-query.dto';

export class GymsQueryDto extends PaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}
