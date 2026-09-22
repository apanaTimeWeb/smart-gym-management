// RESPONSIBILITY: Validates Manager schedule query inputs.
// FLOW: HTTP query -> ScheduleQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class ScheduleQueryDto extends PaginationQueryDto {
}
