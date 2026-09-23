// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

import { HrStaffRole } from '@/backend_manager/modules/backend_manager/hr/hr.constants';

export class HrQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() id?: string;
  @IsOptional() @IsString() staffId?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(HrStaffRole) role?: HrStaffRole;
  @IsOptional() @IsISO8601({ strict: false }) month?: string;
  @IsOptional() @IsISO8601({ strict: false }) date?: string;
}
