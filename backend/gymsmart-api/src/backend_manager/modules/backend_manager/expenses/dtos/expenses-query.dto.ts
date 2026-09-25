// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString} from 'class-validator';

import { PaginationQueryDto} from '@/backend_manager/core/dtos/pagination-query.dto';

import { ExpenseStatus} from '@/backend_manager/modules/backend_manager/expenses/expenses.constants';

export class ExpensesQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() id?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsEnum(ExpenseStatus) status?: ExpenseStatus;
  @IsOptional() @IsISO8601({ strict: false}) startDate?: string;
  @IsOptional() @IsISO8601({ strict: false}) endDate?: string;
  @IsOptional() @IsISO8601({ strict: false}) date?: string;}

