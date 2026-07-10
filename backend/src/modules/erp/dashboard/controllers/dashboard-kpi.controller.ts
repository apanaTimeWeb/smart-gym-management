import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomCacheInterceptor } from '@/modules/core/interceptors/custom-cache.interceptor';
import { DashboardKpiService } from '../services/dashboard-kpi.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('dashboard/kpi')
export class DashboardKpiController {
  constructor(private readonly kpiService: DashboardKpiService) {}

  @Get()
  @UseInterceptors(CustomCacheInterceptor)
  @ApiOperation({ summary: 'Get Dashboard KPI stats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'KPI stats retrieved successfully',
  })
  execute() {
    return this.kpiService.execute();
  }
}
