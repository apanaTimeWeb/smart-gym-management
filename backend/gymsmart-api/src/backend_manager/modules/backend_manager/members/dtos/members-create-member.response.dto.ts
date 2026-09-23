// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class MembersCreateMemberResponseDto {
  @ApiProperty({ type: [Object] })
  members?: Array<{ email: string; expiryDate: string; gender: string; joinDate: string; name: string; paidAmount: number; pendingAmount: number; phone: string; plan?: { name: string; }; status: string; }>;

}
