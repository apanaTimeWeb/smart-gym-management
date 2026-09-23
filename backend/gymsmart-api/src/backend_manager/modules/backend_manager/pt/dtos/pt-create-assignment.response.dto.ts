// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class PtCreateAssignmentResponseDto {
  @ApiProperty({ type: [Object] })
  assignments?: Array<{ amountPaid: number; memberName: string; packageName: number; paymentStatus: string; sessionsRemaining: string; trainerName: string; }>;

}
