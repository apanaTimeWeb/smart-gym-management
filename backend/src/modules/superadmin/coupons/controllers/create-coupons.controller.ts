import { Controller, Post, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateCouponsService } from '../services/create-coupons.service';
import { CreateCouponDto } from '../dto/create-coupons.dto';

@ApiTags('Coupons')
@Controller('coupons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateCouponsController {
  constructor(private readonly service: CreateCouponsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create Coupon' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateCouponDto) {
    return this.service.execute(dto);
  }
}
