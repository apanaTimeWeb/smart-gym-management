// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> PtCreateAssignmentResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PtCreateAssignmentResponseDto {
  @ApiProperty({ type: [Object] })
  assignments?: Array<{ amountPaid?: number; memberName?: string; packageName?: number; paymentStatus?: string; sessionsRemaining?: string; trainerName?: string; }>;

}
