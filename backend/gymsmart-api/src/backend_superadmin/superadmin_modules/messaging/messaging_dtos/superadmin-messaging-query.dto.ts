// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the messaging feature.
// FLOW: HTTP query -> class-validator -> SuperadminMessagingListQuery.
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Max, Min} from 'class-validator';
import { SuperadminCorePaginationQueryDto} from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination-query.dto';

/**
 * Primary Intent: Defines SuperadminMessagingQueryDto as the class-level contract for superadmin-messaging-query.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingQueryDto extends SuperadminCorePaginationQueryDto {@ApiPropertyOptional()

  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string = undefined;@ApiPropertyOptional()

  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';}

