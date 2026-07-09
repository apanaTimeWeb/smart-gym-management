import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateOrderService } from '../services/create-order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Store')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('store/orders')
export class CreateOrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  execute(@Body() dto: CreateOrderDto) {
    return this.createOrderService.execute(dto);
  }
}
