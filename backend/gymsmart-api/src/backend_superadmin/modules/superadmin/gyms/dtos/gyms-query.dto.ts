// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the gyms feature.
// FLOW: HTTP query -> class-validator -> GymsListQuery.
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_superadmin/core/pagination/pagination-query.dto';

export class GymsQueryDto extends PaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt', 'updatedAt', 'name', 'ownerName', 'adminEmail', 'phone', 'plan', 'databaseVersion', 'city', 'state', 'memberCount', 'lastActiveAt']) sortBy = 'createdAt';
  /** Frontend-compatible lowercase sort direction alias. */
  @IsOptional() @IsIn(['asc', 'desc']) order?: 'asc' | 'desc';
}