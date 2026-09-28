// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerExpensesCreateExpenseRequestDto } from '@/backend_manager/manager_modules/expenses/expenses_dtos/manager-expenses-create-expense.request.dto';
import { ManagerExpensesCreateExpenseResponseDto } from '@/backend_manager/manager_modules/expenses/expenses_responses/manager-expenses-create-expense.response.dto';
import { ManagerExpensesDeleteExpenseResponseDto } from '@/backend_manager/manager_modules/expenses/expenses_responses/manager-expenses-delete-expense.response.dto';
import { ManagerExpensesUpdateExpenseRequestDto } from '@/backend_manager/manager_modules/expenses/expenses_dtos/manager-expenses-update-expense.request.dto';
import { ManagerExpensesUpdateExpenseResponseDto } from '@/backend_manager/manager_modules/expenses/expenses_responses/manager-expenses-update-expense.response.dto';
import { ManagerExpensesCreateExpenseService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-create-expense.service';
import { ManagerExpensesDeleteExpenseService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-delete-expense.service';
import { ManagerExpensesUpdateExpenseService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-update-expense.service';

@Controller('manager')
@ApiTags('Manager expenses')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerExpensesCommandController {
  constructor(private readonly createExpenseService: ManagerExpensesCreateExpenseService, private readonly updateExpenseService: ManagerExpensesUpdateExpenseService, private readonly deleteExpenseService: ManagerExpensesDeleteExpenseService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("expenses")
  @ApiOperation({ summary: 'createExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerExpensesCreateExpenseResponseDto })
  createExpense(@Body() dto: ManagerExpensesCreateExpenseRequestDto): ReturnType<ManagerExpensesCreateExpenseService['createExpense']> { return this.createExpenseService.createExpense(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("expenses/:id")
  @ApiOperation({ summary: 'updateExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerExpensesUpdateExpenseResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  updateExpense(@Param('id') id: string, @Body() dto: ManagerExpensesUpdateExpenseRequestDto): ReturnType<ManagerExpensesUpdateExpenseService['updateExpense']> { return this.updateExpenseService.updateExpense(dto, id); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete("expenses/:id")
  @ApiOperation({ summary: 'deleteExpense for Manager expenses' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerExpensesDeleteExpenseResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  deleteExpense(@Param('id') id: string): ReturnType<ManagerExpensesDeleteExpenseService['deleteExpense']> {  return this.deleteExpenseService.deleteExpense(id); }


}

export { ManagerExpensesCommandController as ExpensesCommandController };
