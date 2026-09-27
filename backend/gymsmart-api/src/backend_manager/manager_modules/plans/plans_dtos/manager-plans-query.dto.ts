// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { PlansRecordStatus } from '@/backend_manager/manager_modules/plans/manager-plans.constants';

export class ManagerPlansQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() id?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(PlansRecordStatus) status?: PlansRecordStatus;
}

export { ManagerPlansQueryDto as PlansQueryDto };
