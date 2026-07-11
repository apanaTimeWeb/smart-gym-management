import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

/**
 * DashboardController — serves aggregated read-only metrics.
 * No POST/PATCH/DELETE endpoints — dashboard is computed, not managed.
 */
@ApiTags('Superadmin: Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * Primary endpoint — returns all dashboard metrics, charts, and recent onboards.
   * Consumed by the frontend /superadmin/dashboard page.
   */
  @Get()
  @ApiOperation({ summary: 'Get all SaaS dashboard metrics (KPIs, charts, recent onboards)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns { metrics, recentOnboards, revenueChartData, gymGrowthData }' })
  getDashboardData() {
    return this.dashboardService.getDashboardData();
  }

  /** Lightweight polling endpoint — returns only KPI numbers */
  @Get('metrics')
  @ApiOperation({ summary: 'Get lightweight KPI metrics (for polling)' })
  @ApiResponse({ status: HttpStatus.OK })
  getMetrics() {
    return this.dashboardService.getMetrics();
  }
}
