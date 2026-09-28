// RESPONSIBILITY: Defines the typed emergency contact response for Manager member detail.
// FLOW: Member persisted relation -> explicit contact fields -> member response.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerMembersEmergencyContactResponseDto {
  @ApiProperty()
  name!: string;
  @ApiProperty()
  phone!: string;
}

export { ManagerMembersEmergencyContactResponseDto as MembersEmergencyContactResponseDto };
