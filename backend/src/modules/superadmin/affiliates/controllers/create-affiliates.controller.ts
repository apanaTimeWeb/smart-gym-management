import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateAffiliatesService } from '../services/create-affiliates.service';

@ApiTags('Affiliates')
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateAffiliatesController {
  constructor(private readonly affiliatesService: CreateAffiliatesService) {}
  
  @Post()
  async execute() {
    return this.affiliatesService.execute();
  }
}
