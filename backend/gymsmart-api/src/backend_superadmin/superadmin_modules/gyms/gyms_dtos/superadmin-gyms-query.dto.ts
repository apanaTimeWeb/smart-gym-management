// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the gyms feature.
// FLOW: HTTP query -> class-validator -> SuperadminGymsListQuery.
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { IsIn, IsOptional, IsString} from 'class-validator';
import { SuperadminCorePaginationQueryDto} from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination-query.dto';

/**
 * Primary Intent: Defines SuperadminGymsQueryDto as the class-level contract for superadmin-gyms-query.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsQueryDto extends SuperadminCorePaginationQueryDto {@ApiPropertyOptional()

  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;@ApiPropertyOptional()

  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt', 'updatedAt', 'name', 'ownerName', 'adminEmail', 'phone', 'plan', 'databaseVersion', 'city', 'state', 'memberCount', 'lastActiveAt']) sortBy = 'createdAt';@ApiPropertyOptional()

  /** Frontend-compatible lowercase sort direction alias. */
  @IsOptional() @IsIn(['ASC', 'DESC', 'asc', 'desc']) order?: 'asc' | 'desc';}


