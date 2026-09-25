// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin attendance.
// FLOW: Repository domain â†’ Attendance response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminAttendanceStatus } from '@/backend_admin/admin_modules/admin_attendance/admin-attendance.constants.js';

/**
 * @description Defines the AdminAttendanceRecordDto boundary for the admin_attendance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
  status!: AdminAttendanceStatus;
  @ApiProperty()
  planName!: string;
  @ApiPropertyOptional()
  trainerId?: string;
  @ApiPropertyOptional()
  trainerName?: string;
  @ApiPropertyOptional({ enum: ['General', 'PT', 'Class'] })
  sessionType?: string;
}

/**
 * @description Defines the AdminAttendanceSummaryDto boundary for the admin_attendance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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

/**
 * @description Defines the AdminAttendanceTrendPointDto boundary for the admin_attendance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAttendanceTrendPointDto {
  @ApiProperty()
  date!: string;
  @ApiProperty()
  count!: number;
}

