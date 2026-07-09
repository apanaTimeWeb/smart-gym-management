import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { FindSalesService } from '@/modules/sales/services/find-sales.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Sales')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('sales')
export class FindSalesController {
  constructor(private readonly findSalesService: FindSalesService) {}

  @Get()
  @ApiOperation({ summary: 'Get sales overview' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return sales data' })
  execute() {
    return this.findSalesService.execute();
  }
}
