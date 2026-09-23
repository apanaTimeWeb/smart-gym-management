// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the invoices feature.
// FLOW: HTTP query -> class-validator -> SuperadminInvoicesListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SuperadminPaginationQueryDto } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination-query.dto';

export class SuperadminInvoicesQueryDto extends SuperadminPaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}