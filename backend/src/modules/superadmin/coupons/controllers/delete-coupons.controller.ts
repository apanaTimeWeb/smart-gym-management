import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteCouponsService } from '../services/delete-coupons.service';

@ApiTags('Coupons')
@Controller('coupons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteCouponsController {
  constructor(private readonly couponsService: DeleteCouponsService) {}
  
  @Delete()
  async execute() {
    return this.couponsService.execute();
  }
}
