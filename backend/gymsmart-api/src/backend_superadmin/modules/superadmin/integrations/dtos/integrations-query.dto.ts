// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the integrations feature.
// FLOW: HTTP query -> class-validator -> IntegrationsListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationQueryDto } from '@/backend_superadmin/core/pagination/pagination-query.dto';

export class IntegrationsQueryDto extends PaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}
