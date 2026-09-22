// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> CommunicationsFetchCommunicationKPIsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommunicationsFetchCommunicationKPIsResponseDto {
  @ApiProperty({ type: Number })
  campaignsThisMonth!: number;

  @ApiProperty({ type: Number })
  emailSent!: number;

  @ApiProperty({ type: Number })
  totalSent!: number;

  @ApiProperty({ type: Number })
  whatsappSent!: number;

}
