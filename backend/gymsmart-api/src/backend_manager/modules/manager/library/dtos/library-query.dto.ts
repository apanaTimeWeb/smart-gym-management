// RESPONSIBILITY: Validates Manager library query inputs.
// FLOW: HTTP query -> LibraryQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class LibraryQueryDto extends PaginationQueryDto {
}
