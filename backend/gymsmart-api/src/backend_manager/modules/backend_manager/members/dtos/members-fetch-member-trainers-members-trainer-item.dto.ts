// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class MembersFetchMemberTrainersMembersTrainerItemDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() role!: string; }
