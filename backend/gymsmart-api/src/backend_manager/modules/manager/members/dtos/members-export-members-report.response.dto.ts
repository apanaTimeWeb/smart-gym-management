// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersExportMembersReportResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersExportMembersReportResponseDto {
  @ApiProperty({ type: Number })
  total!: number;

}
