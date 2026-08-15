import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { StatsGymsService } from '../services/stats-gyms.service';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StatsGymsController {
  constructor(private readonly service: StatsGymsService) {}
  
  @Get('stats')
  async execute() {
    return this.service.execute();
  }
}
