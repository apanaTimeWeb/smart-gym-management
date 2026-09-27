// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CommunicationsFetchChurnedMembersItemResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-fetch-churned-members-item.response.dto';

export class ManagerCommunicationsFetchChurnedMembersResponseDto {
  @ApiProperty({ type: [CommunicationsFetchChurnedMembersItemResponseDto] })
  data!: Array<CommunicationsFetchChurnedMembersItemResponseDto>;

  @ApiProperty({ type: Number })
  daysSinceExit!: number;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  exitDate!: string;

  @ApiPropertyOptional()
  lastContactedAt!: string | null;

  @ApiProperty({ type: Number })
  lifetimeValue!: number;

  @ApiProperty()
  memberId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  plan!: string;

  @ApiProperty({ type: Boolean })
  recovered!: boolean;

}

export { ManagerCommunicationsFetchChurnedMembersResponseDto as CommunicationsFetchChurnedMembersResponseDto };
