import { Controller, Get, Query, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindAttendanceService } from '@/modules/erp/attendance/services/find-attendance.service';
import { FindAttendanceDto } from '@/modules/erp/attendance/dto/find-attendance.dto';

@ApiTags('Attendance')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindAttendanceController {
  constructor(private readonly findAttendanceService: FindAttendanceService) {}

  @Get()
  @ApiOperation({ summary: 'Find all attendances with optional filtering' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Attendances fetched successfully',
  })
  findAll(@Query() query: FindAttendanceDto) {
    return this.findAttendanceService.findAll(query);
  }
}
