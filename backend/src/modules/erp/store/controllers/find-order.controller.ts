import { Controller, Get, Query, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { FindOrderService } from '@/modules/erp/store/services/find-order.service';
import { FindOrderDto } from '@/modules/erp/store/dto/find-order.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Store')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('store/orders')
export class FindOrderController {
  constructor(private readonly findOrderService: FindOrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all orders' })
  execute(@Query() query: FindOrderDto) {
    return this.findOrderService.execute(query);
  }
}
