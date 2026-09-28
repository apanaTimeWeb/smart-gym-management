// RESPONSIBILITY: Validates Manager grievance list filters.
// FLOW: Query string -> strict validation -> grievance repository query.
import { IsISO8601, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

export class ManagerGrievanceQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsISO8601({ strict: false }) date?: string;
}

export { ManagerGrievanceQueryDto as GrievanceQueryDto };
