import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ToggleFeaturesService } from '../services/toggle-features.service';

@ApiTags('Features')
@Controller('features/flags/:id/toggle')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ToggleFeaturesController {
  constructor(private readonly service: ToggleFeaturesService) {}
  @Patch()
  async execute(@Param('id') id: string) { return this.service.execute(id); }
}
