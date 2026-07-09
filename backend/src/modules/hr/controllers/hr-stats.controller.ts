import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { HrStatsService } from '@/modules/hr/services/hr-stats.service';

@ApiTags('HR - Summary')
@Controller('hr/summary')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class HrStatsController {
  constructor(private readonly hrStatsService: HrStatsService) {}

  @Get()
  @ApiOperation({ summary: 'Get overall HR summary' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'HR summary fetched successfully',
  })
  getSummary() {
    return this.hrStatsService.getSummary();
  }
}
