// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerHrPayStaffDueResponseDto {
  @ApiProperty({ type: Number })
  paidAmount!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerHrPayStaffDueResponseDto as HrPayStaffDueResponseDto };
