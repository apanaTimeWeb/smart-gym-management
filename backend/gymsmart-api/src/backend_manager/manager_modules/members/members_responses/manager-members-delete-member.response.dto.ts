// RESPONSIBILITY: Exposes the stable resource identifier returned by a soft-delete mutation.
// FLOW: Soft-delete result -> resource id -> canonical API envelope.
import { ApiProperty } from '@nestjs/swagger';
export class ManagerMembersDeleteMemberResponseDto { @ApiProperty() id!: string; }

export { ManagerMembersDeleteMemberResponseDto as MembersDeleteMemberResponseDto };
