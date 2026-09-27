// RESPONSIBILITY: Exposes the paginated Manager member-list response consumed by the table.
// FLOW: Repository page -> member rows -> pagination metadata -> canonical API envelope.
import { ApiProperty } from '@nestjs/swagger';
import { MembersMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-member.response.dto';
export class ManagerMembersFetchMembersResponseDto { @ApiProperty({ type: [MembersMemberResponseDto] }) members!: MembersMemberResponseDto[]; @ApiProperty() total!: number; @ApiProperty() page!: number; @ApiProperty() limit!: number; }

export { ManagerMembersFetchMembersResponseDto as MembersFetchMembersResponseDto };
