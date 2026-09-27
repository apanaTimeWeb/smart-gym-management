// RESPONSIBILITY: Owns the Manager maintenance request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import {IsEnum, IsInt, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinLength} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { MaintenancePriority } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.constants';

export class ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString() @MinLength(1) @MaxLength(200) title!: string;
  @IsString() @MinLength(1) @MaxLength(200) equipment!: string;
  @IsEnum(MaintenancePriority) priority!: MaintenancePriority;
  @IsOptional() @IsNumber() @Min(0) estimatedCost!: number;
}

export { ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto as MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto };
