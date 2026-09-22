// RESPONSIBILITY: Validates Manager workout query inputs.
// FLOW: HTTP query -> WorkoutQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class WorkoutQueryDto extends PaginationQueryDto {
}
