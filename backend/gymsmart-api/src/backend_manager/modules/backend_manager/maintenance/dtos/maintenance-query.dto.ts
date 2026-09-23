// RESPONSIBILITY: Validates Manager maintenance list filters.
// FLOW: Query string -> strict validation -> maintenance repository query.
import { IsISO8601, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

export class MaintenanceQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsISO8601({ strict: false }) date?: string;
}
