import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindFeaturesService } from '../services/find-features.service';

@ApiTags('Features')
@Controller('features')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindFeaturesController {
  constructor(private readonly featuresService: FindFeaturesService) {}
  
  @Get()
  async execute() {
    return this.featuresService.execute();
  }
}
