// RESPONSIBILITY: Owns the Manager expenses query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { ExpensesFetchExpenseByIdResponseDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-fetch-expense-by-id.response.dto';
import { ExpensesFetchExpenseByIdService } from '@/backend_manager/modules/manager/expenses/services/expenses-fetch-expense-by-id.service';
import { ExpensesFetchExpenseStatsResponseDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-fetch-expense-stats.response.dto';
import { ExpensesFetchExpenseStatsService } from '@/backend_manager/modules/manager/expenses/services/expenses-fetch-expense-stats.service';
import { ExpensesFetchExpensesResponseDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-fetch-expenses.response.dto';
import { ExpensesFetchExpensesService } from '@/backend_manager/modules/manager/expenses/services/expenses-fetch-expenses.service';
import { ExpensesQueryDto } from '@/backend_manager/modules/manager/expenses/dtos/expenses-query.dto';

@Controller('manager')
@ApiTags('Manager expenses')
@Roles(CoreRole.MANAGER)
export class ExpensesQueryController {
  constructor(private readonly fetchExpensesService: ExpensesFetchExpensesService, private readonly fetchExpenseByIdService: ExpensesFetchExpenseByIdService, private readonly fetchExpenseStatsService: ExpensesFetchExpenseStatsService) {}

  // SLA: FAST
  @Get("expenses/stats")
  @ApiOperation({ summary: 'fetchExpenseStats for Manager expenses' })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesFetchExpenseStatsResponseDto })
  fetchExpenseStats(@Query() query: ExpensesQueryDto): Promise<ExpensesFetchExpenseStatsResponseDto> {  return this.fetchExpenseStatsService.fetchExpenseStats(query) as unknown as Promise<ExpensesFetchExpenseStatsResponseDto>;  }


  // SLA: STANDARD
  @Get("expenses")
  @ApiOperation({ summary: 'fetchExpenses for Manager expenses' })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesFetchExpensesResponseDto })
  fetchExpenses(@Query() query: ExpensesQueryDto): Promise<ExpensesFetchExpensesResponseDto> {  return this.fetchExpensesService.fetchExpenses(query) as unknown as Promise<ExpensesFetchExpensesResponseDto>;  }


  // SLA: STANDARD
  @Get("expenses/:id")
  @ApiOperation({ summary: 'fetchExpenseById for Manager expenses' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ExpensesFetchExpenseByIdResponseDto })
  fetchExpenseById(@Param('id') id: string, @Query() query: ExpensesQueryDto): Promise<ExpensesFetchExpenseByIdResponseDto> {  return this.fetchExpenseByIdService.fetchExpenseById(id, query) as unknown as Promise<ExpensesFetchExpenseByIdResponseDto>;  }


}
