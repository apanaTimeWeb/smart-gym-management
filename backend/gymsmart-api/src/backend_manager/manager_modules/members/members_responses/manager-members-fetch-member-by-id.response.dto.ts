// RESPONSIBILITY: Exposes the frozen complete Manager member response for detail operations.
// FLOW: Member domain lookup -> member response contract -> canonical envelope.
import { MembersMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-member.response.dto';
export class ManagerMembersFetchMemberByIdResponseDto extends MembersMemberResponseDto {}

export { ManagerMembersFetchMemberByIdResponseDto as MembersFetchMemberByIdResponseDto };
