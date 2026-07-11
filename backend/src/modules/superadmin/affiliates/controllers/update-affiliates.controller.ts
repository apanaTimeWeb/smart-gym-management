import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateAffiliatesService } from '../services/update-affiliates.service';

@ApiTags('Affiliates')
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateAffiliatesController {
  constructor(private readonly affiliatesService: UpdateAffiliatesService) {}
  
  @Patch()
  async execute() {
    return this.affiliatesService.execute();
  }
}
