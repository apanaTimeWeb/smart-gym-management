// RESPONSIBILITY: Validates Manager settings query inputs.
// FLOW: HTTP query -> SettingsQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class SettingsQueryDto extends PaginationQueryDto {
}
