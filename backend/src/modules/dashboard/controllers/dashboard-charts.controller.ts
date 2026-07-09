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
import { DashboardChartsService } from '../services/dashboard-charts.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('dashboard/charts')
export class DashboardChartsController {
  constructor(private readonly chartsService: DashboardChartsService) {}

  @Get()
  @UseInterceptors(CustomCacheInterceptor)
  @ApiOperation({ summary: 'Get Dashboard Charts data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Charts data retrieved successfully',
  })
  execute() {
    return this.chartsService.execute();
  }
}
