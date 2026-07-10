import { Controller, Get, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SalesAllMembershipsService } from '@/modules/erp/sales/services/sales-all-memberships.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindSalesDto } from '@/modules/erp/sales/dto/find-sales.dto';

@ApiTags('Sales')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('sales/all-memberships')
export class SalesAllMembershipsController {
  constructor(private readonly salesAllMembershipsService: SalesAllMembershipsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all memberships with pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all memberships' })
  execute(@Query() query: FindSalesDto) {
    return this.salesAllMembershipsService.execute(query);
  }
}
