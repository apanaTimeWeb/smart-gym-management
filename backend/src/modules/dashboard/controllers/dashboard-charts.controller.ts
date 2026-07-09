import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { DashboardChartsService } from '../services/dashboard-charts.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('dashboard/charts')
export class DashboardChartsController {
  constructor(private readonly chartsService: DashboardChartsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get Dashboard Charts data' })
  @ApiResponse({ status: 200, description: 'Charts data retrieved successfully' })
  execute() {
    return this.chartsService.execute();
  }
}
