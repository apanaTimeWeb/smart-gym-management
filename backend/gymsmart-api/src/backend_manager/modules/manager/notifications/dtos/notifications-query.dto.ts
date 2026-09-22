// RESPONSIBILITY: Validates Manager notifications query inputs.
// FLOW: HTTP query -> NotificationsQueryDto -> read use case -> allowlisted repository query.

import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class NotificationsQueryDto extends PaginationQueryDto {
}
