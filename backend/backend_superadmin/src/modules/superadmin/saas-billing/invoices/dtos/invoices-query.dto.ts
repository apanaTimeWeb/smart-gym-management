// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the invoices feature.
// FLOW: HTTP query -> class-validator -> InvoicesListQuery.
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationQueryDto } from '@/core/pagination/pagination-query.dto';

export class InvoicesQueryDto extends PaginationQueryDto {
  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;
  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';
}
