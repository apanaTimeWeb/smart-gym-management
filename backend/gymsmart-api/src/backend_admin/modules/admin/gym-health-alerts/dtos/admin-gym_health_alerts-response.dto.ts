// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin gym-health-alerts.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain â†’ GymHealthAlerts response mapper â†’ ApiResponse<T>.

export class AdminGymHealthAlertDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  gymId!: string;
  @ApiProperty()
  gymName!: string;
  @ApiProperty({ enum: ['no_new_members', 'revenue_drop', 'high_cancellations', 'pending_payroll', 'low_attendance', 'expiring_members'] })
  alertType!: string;
  @ApiProperty({ enum: ['critical', 'warning', 'info'] })
  severity!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  description!: string;
  @ApiProperty()
  metric!: string;
  @ApiProperty()
  threshold!: string;
  @ApiProperty()
  detectedAt!: string;
  @ApiProperty()
  isResolved!: boolean;
  @ApiPropertyOptional()
  resolvedAt?: string;
  @ApiPropertyOptional()
  alertAge?: number;
  @ApiPropertyOptional()
  assignedTo?: string;
  @ApiPropertyOptional()
  snoozeUntil?: string;
}


export class AdminGymHealthKPIDataDto {
  @ApiProperty()
  totalAlerts!: number;
  @ApiProperty()
  criticalAlerts!: number;
  @ApiProperty()
  warningAlerts!: number;
  @ApiProperty()
  gymsAtRisk!: number;
}
