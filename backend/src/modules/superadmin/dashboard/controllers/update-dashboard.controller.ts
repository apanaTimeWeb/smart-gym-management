import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateDashboardService } from '../services/update-dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateDashboardController {
  constructor(private readonly dashboardService: UpdateDashboardService) {}
  
  @Patch()
  async execute() {
    return this.dashboardService.execute();
  }
}
