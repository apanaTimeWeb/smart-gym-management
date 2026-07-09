import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { DashboardKpiService } from '../services/dashboard-kpi.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('dashboard/kpi')
export class DashboardKpiController {
  constructor(private readonly kpiService: DashboardKpiService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get Dashboard KPI stats' })
  @ApiResponse({ status: 200, description: 'KPI stats retrieved successfully' })
  execute() {
    return this.kpiService.execute();
  }
}
