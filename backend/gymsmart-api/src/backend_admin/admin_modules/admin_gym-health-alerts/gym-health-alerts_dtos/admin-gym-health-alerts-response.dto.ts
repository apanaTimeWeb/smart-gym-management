// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin gym-health-alerts.
// FLOW: Repository domain â†’ GymHealthAlerts response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminGymHealthAlertsSeverity } from '@/backend_admin/admin_modules/admin_gym-health-alerts/admin-gym-health-alerts.constants.js';

/**
 * @description Defines the AdminGymHealthAlertDto boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
  severity!: AdminGymHealthAlertsSeverity;
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

/**
 * @description Defines the AdminGymHealthKPIDataDto boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
