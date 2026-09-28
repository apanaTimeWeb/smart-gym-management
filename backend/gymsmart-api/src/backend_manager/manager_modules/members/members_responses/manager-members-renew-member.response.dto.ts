// RESPONSIBILITY: Exposes the explicit frozen Manager member renewal response contract.
// FLOW: Renewed member domain projection -> typed member response -> canonical envelope.
import { MembersMemberResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-member.response.dto';

export class ManagerMembersRenewMemberResponseDto extends MembersMemberResponseDto {}

export { ManagerMembersRenewMemberResponseDto as MembersRenewMemberResponseDto };
