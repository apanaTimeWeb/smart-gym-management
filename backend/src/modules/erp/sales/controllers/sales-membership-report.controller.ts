import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SalesMembershipReportService } from '@/modules/erp/sales/services/sales-membership-report.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Sales')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('sales/membership-report')
export class SalesMembershipReportController {
  constructor(private readonly salesMembershipReportService: SalesMembershipReportService) {}

  @Get()
  @ApiOperation({ summary: 'Get membership revenue report' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return membership report' })
  execute() {
    return this.salesMembershipReportService.execute();
  }
}
