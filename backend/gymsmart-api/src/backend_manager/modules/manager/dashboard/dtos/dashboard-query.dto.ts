// RESPONSIBILITY: Validates Manager dashboard query inputs.
// FLOW: HTTP query -> DashboardQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class DashboardQueryDto extends PaginationQueryDto {
}
