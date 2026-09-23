// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class HrFetchStaffResponseDto {
  @ApiProperty({ type: [Object] })
  staff?: Array<{ advanceSalary: number; email: string; joinDate: string; name: string; phone: string; role: string; salary: number; }>;

}
