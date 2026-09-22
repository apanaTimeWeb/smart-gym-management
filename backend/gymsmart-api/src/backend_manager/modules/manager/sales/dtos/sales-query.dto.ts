// RESPONSIBILITY: Validates Manager sales query inputs.
// FLOW: HTTP query -> SalesQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class SalesQueryDto extends PaginationQueryDto {
}
