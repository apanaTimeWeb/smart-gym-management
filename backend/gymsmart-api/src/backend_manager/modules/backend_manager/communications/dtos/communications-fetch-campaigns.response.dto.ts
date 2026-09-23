// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class CommunicationsFetchCampaignsResponseDto {
  @ApiProperty({ type: [Object] })
  campaigns?: Array<{ channel: string; segmentLabel: string; sentCount: number; status: string; title: string; }>;

}
