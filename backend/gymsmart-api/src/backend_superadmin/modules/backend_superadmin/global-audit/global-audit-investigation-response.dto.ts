// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class GlobalAuditInvestigationResponseDto {
  @ApiProperty()
  changes!: Array<{ time: string; actor: string; action: string; resource: string; before: string; after: string; risk: string }>;
  @ApiProperty()
  anomalies!: Array<{ title: string; detail: string; severity: string }>;
  @ApiProperty()
  filters!: string[];
}