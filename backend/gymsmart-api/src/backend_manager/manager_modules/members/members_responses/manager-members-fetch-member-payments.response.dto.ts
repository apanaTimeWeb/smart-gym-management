// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerMembersPaymentStatus } from '@/backend_manager/manager_modules/members/manager-members.constants';

export class ManagerMembersFetchMemberPaymentsResponseDto {
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

  @ApiProperty({ example: 'INR' })
  currency!: string;

  @ApiProperty()
  status!: ManagerMembersPaymentStatus;
}

export { ManagerMembersFetchMemberPaymentsResponseDto as MembersFetchMemberPaymentsResponseDto };
