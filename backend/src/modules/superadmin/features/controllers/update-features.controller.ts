import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateFeaturesService } from '../services/update-features.service';

@ApiTags('Features')
@Controller('features')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateFeaturesController {
  constructor(private readonly featuresService: UpdateFeaturesService) {}
  
  @Patch()
  async execute() {
    return this.featuresService.execute();
  }
}
