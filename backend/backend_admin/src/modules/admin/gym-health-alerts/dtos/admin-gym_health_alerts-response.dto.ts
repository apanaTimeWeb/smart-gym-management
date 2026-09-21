// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin gym-health-alerts.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → GymHealthAlerts response mapper → ApiResponse<T>.

export class AdminGymHealthAlertsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymId' })
  gymId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymName' })
  gymName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: alertType' })
  alertType?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: severity' })
  severity?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: title' })
  title?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: description' })
  description?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: metric' })
  metric?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: threshold' })
  threshold?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: detectedAt' })
  detectedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: isResolved' })
  isResolved?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: resolvedAt' })
  resolvedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: alertAge' })
  alertAge?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: assignedTo' })
  assignedTo?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: snoozeUntil' })
  snoozeUntil?: string;
}
