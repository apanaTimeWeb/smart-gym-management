// RESPONSIBILITY: Validates Manager maintenance query inputs.
// FLOW: HTTP query -> MaintenanceQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/core/dtos/pagination-query.dto';

export class MaintenanceQueryDto extends PaginationQueryDto {
}
