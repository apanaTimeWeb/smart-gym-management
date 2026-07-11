import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindAffiliatesService } from '../services/find-affiliates.service';

@ApiTags('Affiliates')
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindAffiliatesController {
  constructor(private readonly affiliatesService: FindAffiliatesService) {}
  
  @Get()
  async execute() {
    return this.affiliatesService.execute();
  }
}
