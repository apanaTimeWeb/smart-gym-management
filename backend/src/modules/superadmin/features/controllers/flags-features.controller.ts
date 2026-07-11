import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FlagsFeaturesService } from '../services/flags-features.service';

@ApiTags('Features')
@Controller('features/flags')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FlagsFeaturesController {
  constructor(private readonly service: FlagsFeaturesService) {}
  @Post()
  async execute(@Body() dto: any) { return this.service.execute(dto); }
}
