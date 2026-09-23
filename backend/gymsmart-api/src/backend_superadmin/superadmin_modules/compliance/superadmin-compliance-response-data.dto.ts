// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminComplianceResponseDataDto {
  @ApiProperty()
  summary!: { registeredTenants: number; missingTaxDetails: number; documentsExpiring: number; openComplianceTasks: number };
  @ApiProperty()
  regions!: Array<{ region: string; registered: number; missing: number; taxRate: number; status: string }>;
  @ApiProperty()
  documents!: Array<{ tenant: string; document: string; status: string; expires: string | null }>;
}