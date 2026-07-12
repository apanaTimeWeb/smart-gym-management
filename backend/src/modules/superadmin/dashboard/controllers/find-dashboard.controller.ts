import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindDashboardService } from '../services/find-dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindDashboardController {
  constructor(private readonly dashboardService: FindDashboardService) {}
  
  @Get()
  async execute() {
    return this.dashboardService.execute();
  }
}
