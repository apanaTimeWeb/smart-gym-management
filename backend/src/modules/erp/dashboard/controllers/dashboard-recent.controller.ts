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
import { DashboardRecentService } from '../services/dashboard-recent.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('dashboard/recent')
export class DashboardRecentController {
  constructor(private readonly recentService: DashboardRecentService) {}

  @Get()
  @UseInterceptors(CustomCacheInterceptor)
  @ApiOperation({ summary: 'Get Dashboard Recent data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recent data retrieved successfully',
  })
  execute() {
    return this.recentService.execute();
  }
}
