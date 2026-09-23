// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { ExpensesCreateExpenseRequestDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-create-expense.request.dto';
import { ExpensesCreateExpenseResponseDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-create-expense.response.dto';
import { ExpensesDeleteExpenseResponseDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-delete-expense.response.dto';
import { ExpensesUpdateExpenseRequestDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-update-expense.request.dto';
import { ExpensesUpdateExpenseResponseDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-update-expense.response.dto';
import { ExpensesCreateExpenseService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-create-expense.service';
import { ExpensesDeleteExpenseService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-delete-expense.service';
import { ExpensesUpdateExpenseService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-update-expense.service';

@Controller('manager')
@ApiTags('Manager expenses')
@Roles(CoreRole.MANAGER)
export class ExpensesCommandController {
  constructor(private readonly createExpenseService: ExpensesCreateExpenseService, private readonly updateExpenseService: ExpensesUpdateExpenseService, private readonly deleteExpenseService: ExpensesDeleteExpenseService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("expenses")
  @ApiOperation({ summary: 'createExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ExpensesCreateExpenseResponseDto })
  createExpense(@Body() dto: ExpensesCreateExpenseRequestDto): ReturnType<ExpensesCreateExpenseService['createExpense']> { return this.createExpenseService.createExpense(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("expenses/:id")
  @ApiOperation({ summary: 'updateExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesUpdateExpenseResponseDto })
  updateExpense(@Param('id') id: string, @Body() dto: ExpensesUpdateExpenseRequestDto): ReturnType<ExpensesUpdateExpenseService['updateExpense']> { return this.updateExpenseService.updateExpense(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("expenses/:id")
  @ApiOperation({ summary: 'deleteExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesDeleteExpenseResponseDto })
  deleteExpense(@Param('id') id: string): ReturnType<ExpensesDeleteExpenseService['deleteExpense']> {  return this.deleteExpenseService.deleteExpense(id); }


}
