import { ManagerMembersPaymentStatus } from '@/modules/manager/members/members.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersAddMemberPaymentResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersAddMemberPaymentResponseDto {
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
