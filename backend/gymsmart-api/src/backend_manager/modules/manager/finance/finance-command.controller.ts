// RESPONSIBILITY: Owns the Manager finance command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { FinanceCreatePaymentRequestDto } from '@/modules/manager/finance/dtos/finance-create-payment.request.dto';
import { FinanceCreatePaymentResponseDto } from '@/modules/manager/finance/dtos/finance-create-payment.response.dto';
import { FinanceCreatePaymentService } from '@/modules/manager/finance/services/finance-create-payment.service';
import { FinanceQueryDto } from '@/modules/manager/finance/dtos/finance-query.dto';

@Controller('manager')
@ApiTags('Manager finance')
@Roles(CoreRole.MANAGER)
export class FinanceCommandController {
  constructor(private readonly createPaymentService: FinanceCreatePaymentService) {}

  // SLA: STANDARD
  @Post("finance/payments")
  @ApiOperation({ summary: 'createPayment for Manager finance' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: FinanceCreatePaymentResponseDto })
  createPayment(@Body() dto: FinanceCreatePaymentRequestDto): Promise<FinanceCreatePaymentResponseDto> {  return this.createPaymentService.createPayment(dto) as Promise<FinanceCreatePaymentResponseDto>;  }


}
