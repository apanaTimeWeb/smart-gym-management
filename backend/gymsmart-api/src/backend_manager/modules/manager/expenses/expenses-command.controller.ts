// RESPONSIBILITY: Owns the Manager expenses command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { ExpensesCreateExpenseRequestDto } from '@/modules/manager/expenses/dtos/expenses-create-expense.request.dto';
import { ExpensesCreateExpenseResponseDto } from '@/modules/manager/expenses/dtos/expenses-create-expense.response.dto';
import { ExpensesCreateExpenseService } from '@/modules/manager/expenses/services/expenses-create-expense.service';
import { ExpensesDeleteExpenseResponseDto } from '@/modules/manager/expenses/dtos/expenses-delete-expense.response.dto';
import { ExpensesDeleteExpenseService } from '@/modules/manager/expenses/services/expenses-delete-expense.service';
import { ExpensesQueryDto } from '@/modules/manager/expenses/dtos/expenses-query.dto';
import { ExpensesUpdateExpenseRequestDto } from '@/modules/manager/expenses/dtos/expenses-update-expense.request.dto';
import { ExpensesUpdateExpenseResponseDto } from '@/modules/manager/expenses/dtos/expenses-update-expense.response.dto';
import { ExpensesUpdateExpenseService } from '@/modules/manager/expenses/services/expenses-update-expense.service';

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
  createExpense(@Body() dto: ExpensesCreateExpenseRequestDto): Promise<ExpensesCreateExpenseResponseDto> {  return this.createExpenseService.createExpense(dto) as Promise<ExpensesCreateExpenseResponseDto>;  }


  // SLA: STANDARD
  @Patch("expenses/:id")
  @ApiOperation({ summary: 'updateExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesUpdateExpenseResponseDto })
  updateExpense(@Param('id') id: string, @Body() dto: ExpensesUpdateExpenseRequestDto): Promise<ExpensesUpdateExpenseResponseDto> {  return this.updateExpenseService.updateExpense(dto, id) as Promise<ExpensesUpdateExpenseResponseDto>;  }


  // SLA: STANDARD
  @Delete("expenses/:id")
  @ApiOperation({ summary: 'deleteExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesDeleteExpenseResponseDto })
  deleteExpense(@Param('id') id: string): Promise<ExpensesDeleteExpenseResponseDto> {  return this.deleteExpenseService.deleteExpense(id); }


}
