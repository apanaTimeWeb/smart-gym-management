// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { PtSessionStatus } from '@/backend_manager/manager_modules/pt/manager-pt.constants';

export class ManagerPtQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() trainerId?: string;
  @IsOptional() @IsEnum(PtSessionStatus) status?: PtSessionStatus;
}

export { ManagerPtQueryDto as PtQueryDto };
