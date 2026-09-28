// RESPONSIBILITY: Owns the Manager expenses request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import {IsBoolean, IsEnum, IsISO8601, IsInt, IsNumber, IsOptional, IsString, Matches, Min} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { ExpenseStatus, RecurringFrequency } from '@/backend_manager/manager_modules/expenses/manager-expenses.constants';
import { ExpensePaymentMode } from '@/backend_manager/manager_modules/expenses/manager-expenses.constants';

export class ManagerExpensesCreateExpenseRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString()
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  category!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  amount!: number;

  @IsISO8601()
  @ApiProperty()
  date!: string;

  @IsEnum(ExpenseStatus)
  @ApiProperty()
  status!: ExpenseStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  referenceNo!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  notes!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  receiptUrl!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  vendorName!: string;

  @IsOptional()
  @IsEnum(ExpensePaymentMode)
  @ApiPropertyOptional()
  paymentMode!: ExpensePaymentMode;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  approvedBy!: string;

  @IsBoolean()
  @ApiProperty()
  isRecurring!: boolean;

  @IsOptional()
  @IsEnum(RecurringFrequency)
  @ApiPropertyOptional()
  recurringFrequency!: RecurringFrequency | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional()
  taxAmount!: number;
}

export { ManagerExpensesCreateExpenseRequestDto as ExpensesCreateExpenseRequestDto };
