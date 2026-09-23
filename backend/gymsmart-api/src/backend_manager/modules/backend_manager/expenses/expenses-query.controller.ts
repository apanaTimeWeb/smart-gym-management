// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { ExpensesFetchExpenseByIdResponseDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-fetch-expense-by-id.response.dto';
import { ExpensesFetchExpenseStatsResponseDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-fetch-expense-stats.response.dto';
import { ExpensesFetchExpensesResponseDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-fetch-expenses.response.dto';
import { ExpensesQueryDto } from '@/backend_manager/modules/backend_manager/expenses/dtos/expenses-query.dto';
import { ExpensesFetchExpenseByIdService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-fetch-expense-by-id.service';
import { ExpensesFetchExpenseStatsService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-fetch-expense-stats.service';
import { ExpensesFetchExpensesService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-fetch-expenses.service';

@Controller('manager')
@ApiTags('Manager expenses')
@Roles(CoreRole.MANAGER)
export class ExpensesQueryController {
  constructor(private readonly fetchExpensesService: ExpensesFetchExpensesService, private readonly fetchExpenseByIdService: ExpensesFetchExpenseByIdService, private readonly fetchExpenseStatsService: ExpensesFetchExpenseStatsService) {}

  // SLA: FAST
  @Get("expenses/stats")
  @ApiOperation({ summary: 'fetchExpenseStats for Manager expenses' })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesFetchExpenseStatsResponseDto })
  fetchExpenseStats(@Query() query: ExpensesQueryDto): ReturnType<ExpensesFetchExpenseStatsService['fetchExpenseStats']> { return this.fetchExpenseStatsService.fetchExpenseStats(query as any); }


  // SLA: STANDARD
  @Get("expenses")
  @ApiOperation({ summary: 'fetchExpenses for Manager expenses' })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesFetchExpensesResponseDto })
  fetchExpenses(@Query() query: ExpensesQueryDto): ReturnType<ExpensesFetchExpensesService['fetchExpenses']> { return this.fetchExpensesService.fetchExpenses(query as any); }


  // SLA: STANDARD
  @Get("expenses/:id")
  @ApiOperation({ summary: 'fetchExpenseById for Manager expenses' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesFetchExpenseByIdResponseDto })
  fetchExpenseById(@Param('id') id: string, @Query() query: ExpensesQueryDto): ReturnType<ExpensesFetchExpenseByIdService['fetchExpenseById']> { return this.fetchExpenseByIdService.fetchExpenseById(id, query as any); }


}
