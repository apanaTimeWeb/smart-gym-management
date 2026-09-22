// RESPONSIBILITY: Validates Manager expenses query inputs.
// FLOW: HTTP query -> ExpensesQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class ExpensesQueryDto extends PaginationQueryDto {
  @IsOptional()
@IsString()
  id!: string;

}
