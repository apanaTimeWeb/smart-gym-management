// RESPONSIBILITY: Exposes the frozen complete Manager member response for update operations.
// FLOW: Updated member domain object -> member response contract -> canonical envelope.
import { MembersMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-member.response.dto';
export class ManagerMembersUpdateMemberResponseDto extends MembersMemberResponseDto {}

export { ManagerMembersUpdateMemberResponseDto as MembersUpdateMemberResponseDto };
