// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin attendance.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Attendance response mapper → ApiResponse<T>.

export class AdminAttendanceRecordDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  memberId!: string;
  @ApiProperty()
  memberName!: string;
  @ApiProperty()
  memberPhone!: string;
  @ApiProperty()
  branchId!: string;
  @ApiProperty()
  branchName!: string;
  @ApiProperty()
  checkInTime!: string;
  @ApiPropertyOptional()
  checkOutTime?: string;
  @ApiProperty()
  date!: string;
  @ApiProperty({ enum: ['present', 'absent', 'late'] })
  status!: string;
  @ApiProperty()
  planName!: string;
  @ApiPropertyOptional()
  trainerId?: string;
  @ApiPropertyOptional()
  trainerName?: string;
  @ApiPropertyOptional({ enum: ['General', 'PT', 'Class'] })
  sessionType?: string;
}

export class AdminAttendanceSummaryDto {
  @ApiProperty()
  todayTotal!: number;
  @ApiProperty()
  todayPresent!: number;
  @ApiProperty()
  todayLate!: number;
  @ApiProperty()
  weeklyAverage!: number;
  @ApiProperty()
  peakHour!: string;
  @ApiProperty()
  trendVsLastWeek!: number;
  @ApiProperty()
  uniqueMembersThisMonth!: number;
}

export class AdminAttendanceTrendPointDto {
  @ApiProperty()
  date!: string;
  @ApiProperty()
  count!: number;
}


