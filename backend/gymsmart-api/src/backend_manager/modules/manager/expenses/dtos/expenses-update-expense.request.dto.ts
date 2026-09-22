// @ts-nocheck
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/expenses/:id.
// FLOW: HTTP payload -> ExpensesUpdateExpenseRequestDto validation -> write use case -> orchestrator.

import { IsBoolean, IsEnum, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ExpenseStatus, RecurringFrequency } from '@/backend_manager/modules/manager/expenses/expenses.constants';
import { ExpensePaymentMode } from '@/backend_manager/modules/manager/expenses/expenses.constants';

export class ExpensesUpdateExpenseRequestDto extends CoreRequestDto {
  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsNumber()
  @Type(() => Number)
  amount!: number;

  @IsISO8601()
  date!: string;

  @IsEnum(ExpenseStatus)
  status!: ExpenseStatus;

  @IsOptional()
  @IsString()
  referenceNo!: string;

  @IsOptional()
  @IsString()
  notes!: string;

  @IsOptional()
  @IsString()
  receiptUrl!: string;

  @IsOptional()
  @IsString()
  vendorName!: string;

  @IsOptional()
  @IsEnum(ExpensePaymentMode)
  paymentMode!: ExpensePaymentMode;

  @IsOptional()
  @IsString()
  approvedBy!: string;

  @IsBoolean()
  isRecurring!: boolean;

  @IsOptional()
  @IsEnum(RecurringFrequency)
  recurringFrequency!: RecurringFrequency | null;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  taxAmount!: number;

}
