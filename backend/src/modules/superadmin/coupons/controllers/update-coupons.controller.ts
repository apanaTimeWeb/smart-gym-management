import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateCouponsService } from '../services/update-coupons.service';

@ApiTags('Coupons')
@Controller('coupons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateCouponsController {
  constructor(private readonly couponsService: UpdateCouponsService) {}
  
  @Patch()
  async execute() {
    return this.couponsService.execute();
  }
}
