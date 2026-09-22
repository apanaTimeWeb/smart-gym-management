// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> HrFetchStaffByIdResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HrFetchStaffByIdResponseDto {
  @ApiProperty()
  branch: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  id: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty()
  joinDate: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: string;

  @ApiProperty({ type: Number })
  salary: number;

}
