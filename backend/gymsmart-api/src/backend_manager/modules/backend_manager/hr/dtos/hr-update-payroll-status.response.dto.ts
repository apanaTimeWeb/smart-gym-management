// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class HrUpdatePayrollStatusResponseDto {
  @ApiProperty({ type: Number })
  amount!: number;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  month!: string;

  @ApiProperty({ type: Number })
  netPayable!: number;

  @ApiProperty({ type: Number })
  paidAmount!: number;

  @ApiProperty({ type: Number })
  pendingAmount!: number;

  @ApiProperty()
  staffId!: string;

  @ApiProperty()
  status!: string;

}
