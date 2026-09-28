// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MaintenancePriorityType, MaintenanceStatus } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.constants';

export class ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto {
  @ApiProperty() id!: string; @ApiProperty() title!: string; @ApiProperty() equipment!: string; @ApiProperty({enum:MaintenanceStatus}) status!: MaintenanceStatus;
  @ApiProperty({enum:MaintenancePriorityType}) priority!: MaintenancePriorityType; @ApiPropertyOptional() assignedVendor?: string;
  @ApiPropertyOptional() estimatedCost?: number; @ApiProperty({ description: 'ISO 4217 currency code paired with estimatedCost.' }) currency!: string; @ApiProperty() reportedAt!: string; @ApiPropertyOptional() resolvedAt?: string;
}

export { ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto as MaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto };
