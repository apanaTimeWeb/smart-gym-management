import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteFeaturesService } from '../services/delete-features.service';

@ApiTags('Features')
@Controller('features')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteFeaturesController {
  constructor(private readonly featuresService: DeleteFeaturesService) {}
  
  @Delete()
  async execute() {
    return this.featuresService.execute();
  }
}
