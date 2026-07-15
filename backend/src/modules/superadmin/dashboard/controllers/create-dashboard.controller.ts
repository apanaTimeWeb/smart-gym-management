import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateDashboardService } from '../services/create-dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateDashboardController {
  constructor(private readonly dashboardService: CreateDashboardService) {}
  
  @Post()
  async execute() {
    return this.dashboardService.execute();
  }
}
