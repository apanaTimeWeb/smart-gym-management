import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateFeaturesService } from '../services/create-features.service';

@ApiTags('Features')
@Controller('features')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateFeaturesController {
  constructor(private readonly featuresService: CreateFeaturesService) {}
  
  @Post()
  async execute() {
    return this.featuresService.execute();
  }
}
