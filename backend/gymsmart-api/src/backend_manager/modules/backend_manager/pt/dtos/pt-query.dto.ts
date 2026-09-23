// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

import { PtSessionStatus } from '@/backend_manager/modules/backend_manager/pt/pt.constants';

export class PtQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() trainerId?: string;
  @IsOptional() @IsEnum(PtSessionStatus) status?: PtSessionStatus;
}
