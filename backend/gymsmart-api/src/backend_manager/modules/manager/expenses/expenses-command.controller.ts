// @ts-nocheck
// RESPONSIBILITY: Owns the Manager expenses command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { ExpensesCreateExpenseRequestDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-create-expense.request.dto';
import { ExpensesCreateExpenseResponseDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-create-expense.response.dto';
import { ExpensesCreateExpenseService } from '@/backend_manager/modules/manager/expenses/services/expenses-create-expense.service';
import { ExpensesDeleteExpenseResponseDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-delete-expense.response.dto';
import { ExpensesDeleteExpenseService } from '@/backend_manager/modules/manager/expenses/services/expenses-delete-expense.service';
import { ExpensesQueryDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-query.dto';
import { ExpensesUpdateExpenseRequestDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-update-expense.request.dto';
import { ExpensesUpdateExpenseResponseDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-update-expense.response.dto';
import { ExpensesUpdateExpenseService } from '@/backend_manager/modules/manager/expenses/services/expenses-update-expense.service';

@Controller('manager')
@ApiTags('Manager expenses')
@Roles(CoreRole.MANAGER)
export class ExpensesCommandController {
  constructor(private readonly createExpenseService: ExpensesCreateExpenseService, private readonly updateExpenseService: ExpensesUpdateExpenseService, private readonly deleteExpenseService: ExpensesDeleteExpenseService) {}

  // SLA: STANDARD
  @Post("expenses")
  @ApiOperation({ summary: 'createExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: ExpensesCreateExpenseResponseDto })
  createExpense(@Body() dto: ExpensesCreateExpenseRequestDto): Promise<ExpensesCreateExpenseResponseDto> {  return this.createExpenseService.createExpense(dto) as unknown as Promise<ExpensesCreateExpenseResponseDto>;  }


  // SLA: STANDARD
  @Patch("expenses/:id")
  @ApiOperation({ summary: 'updateExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesUpdateExpenseResponseDto })
  updateExpense(@Param('id') id: string, @Body() dto: ExpensesUpdateExpenseRequestDto): Promise<ExpensesUpdateExpenseResponseDto> {  return this.updateExpenseService.updateExpense(dto, id) as unknown as Promise<ExpensesUpdateExpenseResponseDto>;  }


  // SLA: STANDARD
  @Delete("expenses/:id")
  @ApiOperation({ summary: 'deleteExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesDeleteExpenseResponseDto })
  deleteExpense(@Param('id') id: string): Promise<ExpensesDeleteExpenseResponseDto> {  return this.deleteExpenseService.deleteExpense(id); }


}
