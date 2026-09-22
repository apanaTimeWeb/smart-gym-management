// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> PtFetchWorkloadResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PtFetchWorkloadResponseDto {
  @ApiProperty({ type: Number })
  activeClients: number;

  @ApiProperty({ type: [Object] })
  data: Array<{activeClients?: string; trainerName?: string;}>;

  @ApiProperty({ type: Number })
  rating: number;

  @ApiProperty({ type: Number })
  totalSessionsConducted: number;

  @ApiProperty()
  trainerId: string;

  @ApiProperty()
  trainerName: string;

}
