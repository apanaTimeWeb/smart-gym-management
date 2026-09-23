// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';import { MembersFetchMemberTrainersMembersTrainerItemDto } from '@/backend_manager/modules/backend_manager/members/dtos/members-fetch-member-trainers-members-trainer-item.dto';

export class MembersFetchMemberTrainersResponseDto { @ApiProperty({ type: [MembersFetchMemberTrainersMembersTrainerItemDto] }) staff!: MembersFetchMemberTrainersMembersTrainerItemDto[]; }
