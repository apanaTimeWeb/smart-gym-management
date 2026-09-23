// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the gyms feature.
// FLOW: HTTP query -> class-validator -> SuperadminGymsListQuery.
import { IsIn, IsOptional, IsString } from 'class-validator';
import { SuperadminPaginationQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination-query.dto';

export class SuperadminGymsQueryDto extends SuperadminPaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt', 'updatedAt', 'name', 'ownerName', 'adminEmail', 'phone', 'plan', 'databaseVersion', 'city', 'state', 'memberCount', 'lastActiveAt']) sortBy = 'createdAt';
  /** Frontend-compatible lowercase sort direction alias. */
  @IsOptional() @IsIn(['asc', 'desc']) order?: 'asc' | 'desc';
}