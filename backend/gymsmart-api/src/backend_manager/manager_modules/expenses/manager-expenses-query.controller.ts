// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerExpensesFetchExpenseByIdResponseDto } from '@/backend_manager/manager_modules/expenses/expenses_responses/manager-expenses-fetch-expense-by-id.response.dto';
import { ManagerExpensesFetchExpenseStatsResponseDto } from '@/backend_manager/manager_modules/expenses/expenses_responses/manager-expenses-fetch-expense-stats.response.dto';
import { ManagerExpensesFetchExpensesResponseDto } from '@/backend_manager/manager_modules/expenses/expenses_responses/manager-expenses-fetch-expenses.response.dto';
import { ManagerExpensesQueryDto } from '@/backend_manager/manager_modules/expenses/expenses_dtos/manager-expenses-query.dto';
import { ManagerExpensesFindExpenseByIdService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-find-expense-by-id.service';
import { ManagerExpensesFindExpenseStatsService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-find-expense-stats.service';
import { ManagerExpensesFindExpensesService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-find-expenses.service';

@Controller('manager')
@ApiTags('Manager expenses')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerExpensesQueryController {
  constructor(private readonly fetchExpensesService: ManagerExpensesFindExpensesService, private readonly fetchExpenseByIdService: ManagerExpensesFindExpenseByIdService, private readonly fetchExpenseStatsService: ManagerExpensesFindExpenseStatsService) {}

  // SLA: FAST
  @Get("expenses/stats")
  @ApiOperation({ summary: 'findExpenseStats for Manager expenses' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerExpensesFetchExpenseStatsResponseDto })
  findExpenseStats(@Query() query: ManagerExpensesQueryDto): ReturnType<ManagerExpensesFindExpenseStatsService['findExpenseStats']> { return this.fetchExpenseStatsService.findExpenseStats(query); }


  // SLA: STANDARD
  @Get("expenses")
  @ApiOperation({ summary: 'findExpenses for Manager expenses' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerExpensesFetchExpensesResponseDto })
  findExpenses(@Query() query: ManagerExpensesQueryDto): ReturnType<ManagerExpensesFindExpensesService['findExpenses']> { return this.fetchExpensesService.findExpenses(query); }


  // SLA: STANDARD
  @Get("expenses/:id")
  @ApiOperation({ summary: 'findExpenseById for Manager expenses' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerExpensesFetchExpenseByIdResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  findExpenseById(@Param('id') id: string, @Query() query: ManagerExpensesQueryDto): ReturnType<ManagerExpensesFindExpenseByIdService['findExpenseById']> { return this.fetchExpenseByIdService.findExpenseById(id, query); }


}

export { ManagerExpensesQueryController as ExpensesQueryController };
