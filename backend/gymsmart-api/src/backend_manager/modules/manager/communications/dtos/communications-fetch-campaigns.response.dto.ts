// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> CommunicationsFetchCampaignsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommunicationsFetchCampaignsResponseDto {
  @ApiProperty({ type: [Object] })
  campaigns?: Array<{ channel: string; segmentLabel: string; sentCount: number; status: string; title: string; }>;

}
