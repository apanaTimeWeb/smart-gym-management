// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsISO8601, IsOptional} from 'class-validator';

import { PaginationQueryDto} from '@/backend_manager/core/dtos/pagination-query.dto';

import { TimeRange} from '@/backend_manager/modules/backend_manager/dashboard/dashboard.constants';

export class DashboardQueryDto extends PaginationQueryDto {
  @IsOptional() @IsEnum(TimeRange) range?: TimeRange;
  @IsOptional() @IsISO8601({ strict:false}) startDate?: string;
  @IsOptional() @IsISO8601({ strict:false}) endDate?: string;}

