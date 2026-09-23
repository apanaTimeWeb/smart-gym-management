// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { FinanceCreatePaymentRequestDto } from '@/backend_manager/modules/backend_manager/finance/dtos/finance-create-payment.request.dto';
import { FinanceCreatePaymentResponseDto } from '@/backend_manager/modules/backend_manager/finance/dtos/finance-create-payment.response.dto';
import { FinanceCreatePaymentService } from '@/backend_manager/modules/backend_manager/finance/services/finance-create-payment.service';

@Controller('manager')
@ApiTags('Manager finance')
@Roles(CoreRole.MANAGER)
export class FinanceCommandController {
  constructor(private readonly createPaymentService: FinanceCreatePaymentService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("finance/payments")
  @ApiOperation({ summary: 'createPayment for Manager finance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: FinanceCreatePaymentResponseDto })
  createPayment(@Body() dto: FinanceCreatePaymentRequestDto): ReturnType<FinanceCreatePaymentService['createPayment']> { return this.createPaymentService.createPayment(dto as any); }


}
