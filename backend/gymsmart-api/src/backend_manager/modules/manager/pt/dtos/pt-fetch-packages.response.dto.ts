// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> PtFetchPackagesResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PtFetchPackagesResponseDto {
  @ApiProperty()
  description: string;

  @ApiProperty({ type: Number })
  durationDays: number;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Number })
  sessionCount: number;

}
