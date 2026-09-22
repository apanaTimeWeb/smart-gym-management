// RESPONSIBILITY: Validates the Trainer attendance checkout request shape only.
// FLOW: HTTP body → AttendanceCheckoutAttendanceDto → AttendanceCheckoutService.

import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class AttendanceCheckoutAttendanceDto {
  @IsOptional() @IsISO8601() checkoutAt?: string;
  @IsOptional() @IsISO8601() checkOutTime?: string;
}
