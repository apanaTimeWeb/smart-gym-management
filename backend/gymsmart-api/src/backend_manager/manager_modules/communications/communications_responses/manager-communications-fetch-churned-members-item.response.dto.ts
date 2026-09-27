// RESPONSIBILITY: Defines a typed item in the owning Manager response contract.
// FLOW: Feature data row -> explicit item fields -> parent response DTO.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerCommunicationsFetchChurnedMembersItemResponseDto {
  @ApiProperty({ required: false })
  exitDate?: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  plan!: string;
  @ApiProperty()
  recovered!: boolean;
}

export { ManagerCommunicationsFetchChurnedMembersItemResponseDto as CommunicationsFetchChurnedMembersItemResponseDto };
