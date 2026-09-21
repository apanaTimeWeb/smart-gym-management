// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin attendance.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Attendance response mapper → ApiResponse<T>.

export class AdminAttendanceResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: memberId' })
  memberId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: memberName' })
  memberName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: memberPhone' })
  memberPhone?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchId' })
  branchId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchName' })
  branchName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: checkInTime' })
  checkInTime?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: checkOutTime' })
  checkOutTime?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: date' })
  date?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: planName' })
  planName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: trainerId' })
  trainerId?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: trainerName' })
  trainerName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: sessionType' })
  sessionType?: string;
}
