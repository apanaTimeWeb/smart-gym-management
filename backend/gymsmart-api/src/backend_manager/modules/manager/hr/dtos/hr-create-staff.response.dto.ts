// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> HrCreateStaffResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HrCreateStaffResponseDto {
  @ApiProperty({ type: [Object] })
  staff?: Array<{ advanceSalary: number; email: string; joinDate: string; name: string; phone: string; role: string; salary: number; }>;

}
