// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the affiliates feature.
// FLOW: HTTP query -> class-validator -> AffiliatesListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationQueryDto } from '@/backend_superadmin/core/pagination/pagination-query.dto';

export class AffiliatesQueryDto extends PaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}