import { Controller, Get, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SalesPendingPaymentsService } from '@/modules/erp/sales/services/sales-pending-payments.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindSalesDto } from '@/modules/erp/sales/dto/find-sales.dto';

@ApiTags('Sales')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('sales/pending-payments')
export class SalesPendingPaymentsController {
  constructor(private readonly salesPendingPaymentsService: SalesPendingPaymentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get pending payments with pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return pending payments' })
  execute(@Query() query: FindSalesDto) {
    return this.salesPendingPaymentsService.execute(query);
  }
}
