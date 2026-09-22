// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersFetchMembersResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersFetchMembersResponseDto {
  @ApiProperty({ type: [Object] })
  members?: Array<{ email: string; expiryDate: string; gender: string; joinDate: string; name: string; paidAmount: number; pendingAmount: number; phone: string; plan?: { name: string; }; status: string; }>;

}
