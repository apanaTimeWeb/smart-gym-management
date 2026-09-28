// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerMembersExportMembersReportResponseDto {
  @ApiProperty({ type: Number })
  total!: number;

}

export { ManagerMembersExportMembersReportResponseDto as MembersExportMembersReportResponseDto };
