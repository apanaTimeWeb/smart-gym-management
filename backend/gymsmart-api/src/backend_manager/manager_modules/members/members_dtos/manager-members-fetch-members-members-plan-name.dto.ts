// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerMembersFetchMembersMembersPlanNameDto { @ApiProperty() name!: string; }

export { ManagerMembersFetchMembersMembersPlanNameDto as MembersFetchMembersMembersPlanNameDto };
