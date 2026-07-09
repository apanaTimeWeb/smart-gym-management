import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { AttendanceStatsService } from '@/modules/attendance/services/attendance-stats.service';

@ApiTags('Attendance')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AttendanceStatsController {
  constructor(private readonly attendanceStatsService: AttendanceStatsService) {}

  @Get('today-stats')
  @ApiOperation({ summary: 'Get attendance statistics for today' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Today stats fetched successfully' })
  getTodayStats() {
    return this.attendanceStatsService.getTodayStats();
  }
}
