// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';import { MembersFetchMembersMembersPlanNameDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-members-members-plan-name.dto';

export class MembersFetchMembersResponseDto {
  @ApiProperty({ type: [Object] })
  members!: Array<{ id?: string; email: string; expiryDate: string; gender: string; joinDate: string; name: string; paidAmount: number; pendingAmount: number; phone: string; plan?: MembersFetchMembersMembersPlanNameDto; status: string; }>;
}
