import { ManagerMembersPaymentStatus } from '@/modules/manager/members/members.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersFetchMemberPaymentsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersFetchMemberPaymentsResponseDto {
  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty()
  id: string;

  @ApiProperty()
  invoiceNumber: string;

  @ApiProperty()
  method: string;

  @ApiProperty()
  paidAt: string;

  @ApiProperty()
  status: ManagerMembersPaymentStatus;

}
