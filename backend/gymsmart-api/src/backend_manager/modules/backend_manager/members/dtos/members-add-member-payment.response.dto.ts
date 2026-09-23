// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerMembersPaymentStatus } from '@/backend_manager/modules/backend_manager/members/members.constants';

export class MembersAddMemberPaymentResponseDto {
  @ApiProperty({ type: Number })
  amount!: number;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  invoiceNumber!: string;

  @ApiProperty()
  method!: string;

  @ApiProperty()
  paidAt!: string;

  @ApiProperty()
  status!: ManagerMembersPaymentStatus;
}
