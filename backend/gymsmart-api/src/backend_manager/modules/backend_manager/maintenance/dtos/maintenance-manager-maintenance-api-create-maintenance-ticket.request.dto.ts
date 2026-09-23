// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsNumber, IsOptional, IsString, Min, MinLength, MaxLength } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { MaintenancePriority } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.constants';

export class MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto extends CoreRequestDto {
  @IsString() @MinLength(1) @MaxLength(200) title!: string;
  @IsString() @MinLength(1) @MaxLength(200) equipment!: string;
  @IsEnum(MaintenancePriority) priority!: MaintenancePriority;
  @IsOptional() @IsNumber() @Min(0) estimatedCost!: number;
}
