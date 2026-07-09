import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { MarkAttendanceService } from '@/modules/attendance/services/mark-attendance.service';
import { MarkAttendanceDto } from '@/modules/attendance/dto/mark-attendance.dto';

@ApiTags('Attendance')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MarkAttendanceController {
  constructor(private readonly markAttendanceService: MarkAttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Mark attendance for a member or staff' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Attendance marked successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload or missing IDs' })
  markAttendance(@Body() dto: MarkAttendanceDto) {
    return this.markAttendanceService.mark(dto);
  }
}
