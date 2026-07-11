import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateCouponsService } from '../services/create-coupons.service';

@ApiTags('Coupons')
@Controller('coupons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateCouponsController {
  constructor(private readonly couponsService: CreateCouponsService) {}
  
  @Post()
  async execute() {
    return this.couponsService.execute();
  }
}
