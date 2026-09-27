// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerHrGiveStaffAdvanceResponseDto {
  @ApiProperty({ type: Number })
  advanceAmount!: number;

  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerHrGiveStaffAdvanceResponseDto as HrGiveStaffAdvanceResponseDto };
