// RESPONSIBILITY: Exposes the frozen complete Manager member response for create operations.
// FLOW: Created member domain object -> member response contract -> canonical envelope.
import { MembersMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-member.response.dto';
export class ManagerMembersCreateMemberResponseDto extends MembersMemberResponseDto {}

export { ManagerMembersCreateMemberResponseDto as MembersCreateMemberResponseDto };
