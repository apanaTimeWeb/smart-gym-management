// RESPONSIBILITY: Owns the Manager maintenance request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ApiPropertyOptional()
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ApiPropertyOptional()
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ApiPropertyOptional()
  status!: string;

}

export { ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto as MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto };
