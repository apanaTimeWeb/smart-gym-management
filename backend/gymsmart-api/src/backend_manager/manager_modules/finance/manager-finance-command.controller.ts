// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerFinanceCreatePaymentRequestDto } from '@/backend_manager/manager_modules/finance/finance_dtos/manager-finance-create-payment.request.dto';
import { ManagerFinanceCreatePaymentResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-create-payment.response.dto';
import { ManagerFinanceCreatePaymentService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-create-payment.service';

@Controller('manager')
@ApiTags('Manager finance')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerFinanceCommandController {
  constructor(private readonly createPaymentService: ManagerFinanceCreatePaymentService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("finance/payments")
  @ApiOperation({ summary: 'createPayment for Manager finance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerFinanceCreatePaymentResponseDto })
  createPayment(@Body() dto: ManagerFinanceCreatePaymentRequestDto): ReturnType<ManagerFinanceCreatePaymentService['createPayment']> { return this.createPaymentService.createPayment(dto); }


}

export { ManagerFinanceCommandController as FinanceCommandController };
