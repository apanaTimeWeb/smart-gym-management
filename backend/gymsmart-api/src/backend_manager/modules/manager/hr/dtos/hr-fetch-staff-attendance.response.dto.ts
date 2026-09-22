// RESPONSIBILITY: Explicit response DTO for staff attendance history consumed by the Manager UI.
// FLOW: Controller result -> HrFetchStaffAttendanceResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.
import { ApiProperty } from '@nestjs/swagger';

export class HrFetchStaffAttendanceResponseDto {
  @ApiProperty({ type: [Object] })
  history!: Array<{ date: string; status: string; checkIn: string; checkOut?: string }>;
}
