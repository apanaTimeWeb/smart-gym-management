// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> HrFetchStaffResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HrFetchStaffResponseDto {
  @ApiProperty({ type: [Object] })
  staff?: Array<{ advanceSalary: number; email: string; joinDate: string; name: string; phone: string; role: string; salary: number; }>;

}
