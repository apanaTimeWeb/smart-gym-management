// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MaintenancePriorityType, MaintenanceStatus } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.constants';

export class MaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto {
  @ApiProperty() id!: string; @ApiProperty() title!: string; @ApiProperty() equipment!: string; @ApiProperty({enum:MaintenanceStatus}) status!: MaintenanceStatus;
  @ApiProperty({enum:MaintenancePriorityType}) priority!: MaintenancePriorityType; @ApiPropertyOptional() assignedVendor?: string;
  @ApiPropertyOptional() estimatedCost?: number; @ApiProperty() reportedAt!: string; @ApiPropertyOptional() resolvedAt?: string;
}
