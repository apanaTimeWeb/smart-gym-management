import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SalesOverviewService } from '@/modules/sales/services/sales-overview.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Sales')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('sales/overview')
export class SalesOverviewController {
  constructor(private readonly salesOverviewService: SalesOverviewService) {}

  @Get()
  @ApiOperation({ summary: 'Get sales overview data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return sales overview data' })
  execute() {
    return this.salesOverviewService.execute();
  }
}
