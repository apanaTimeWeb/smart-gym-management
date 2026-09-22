// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> ProfileUpdateProfileResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileUpdateProfileResponseDto {
  @ApiPropertyOptional()
  email!: string;

  @ApiPropertyOptional()
  name!: string;

  @ApiPropertyOptional()
  phone!: string;

}
