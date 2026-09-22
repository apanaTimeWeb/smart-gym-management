// RESPONSIBILITY: Validates Manager store query inputs.
// FLOW: HTTP query -> StoreQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class StoreQueryDto extends PaginationQueryDto {
}
