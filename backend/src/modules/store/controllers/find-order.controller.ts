import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { FindOrderService } from '../services/find-order.service';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Store')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('store/orders')
export class FindOrderController {
  constructor(private readonly findOrderService: FindOrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all orders' })
  execute(@Query() query: PaginationQueryDto) {
    return this.findOrderService.execute(query);
  }
}
