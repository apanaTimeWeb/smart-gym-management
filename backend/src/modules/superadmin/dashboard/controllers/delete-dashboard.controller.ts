import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteDashboardService } from '../services/delete-dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteDashboardController {
  constructor(private readonly dashboardService: DeleteDashboardService) {}
  
  @Delete()
  async execute() {
    return this.dashboardService.execute();
  }
}
