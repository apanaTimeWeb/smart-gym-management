import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindCouponsService } from '../services/find-coupons.service';

@ApiTags('Coupons')
@Controller('coupons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindCouponsController {
  constructor(private readonly couponsService: FindCouponsService) {}
  
  @Get()
  async execute() {
    return this.couponsService.execute();
  }
}
