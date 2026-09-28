// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';import { MembersFetchMemberTrainersMembersTrainerItemDto } from '@/backend_manager/manager_modules/members/members_dtos/manager-members-fetch-member-trainers-members-trainer-item.dto';

export class ManagerMembersFetchMemberTrainersResponseDto { @ApiProperty({ type: [MembersFetchMemberTrainersMembersTrainerItemDto] }) staff!: MembersFetchMemberTrainersMembersTrainerItemDto[]; }

export { ManagerMembersFetchMemberTrainersResponseDto as MembersFetchMemberTrainersResponseDto };
