// RESPONSIBILITY: Validates Manager profile query inputs.
// FLOW: HTTP query -> ProfileQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class ProfileQueryDto extends PaginationQueryDto {
}
