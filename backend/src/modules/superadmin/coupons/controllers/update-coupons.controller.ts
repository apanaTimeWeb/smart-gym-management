import { Controller, Patch, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateCouponsService } from '../services/update-coupons.service';
import { UpdateCouponDto } from '../dto/update-coupons.dto';

@ApiTags('Coupons')
@Controller('coupons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateCouponsController {
  constructor(private readonly service: UpdateCouponsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update Coupon' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateCouponDto) {
    return this.service.execute(id, dto);
  }
}
