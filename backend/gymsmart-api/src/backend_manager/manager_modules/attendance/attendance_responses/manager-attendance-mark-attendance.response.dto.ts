// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerAttendanceMarkAttendanceResponseDto {
 @ApiProperty() id!: string; @ApiPropertyOptional({type:Number}) memberId?: number; @ApiPropertyOptional({type:Number}) staffId?: number; @ApiProperty() date!: string;
 @ApiPropertyOptional() checkIn?: string; @ApiPropertyOptional() checkOut?: string; @ApiPropertyOptional() checkOutTime?: string; @ApiPropertyOptional() trainerId?: string; @ApiPropertyOptional() trainerName?: string; @ApiProperty() type!: string; @ApiPropertyOptional() status?: string;
 @ApiPropertyOptional({type:Object}) member?: {name:string}; @ApiPropertyOptional({type:Object}) staff?: {name:string}; @ApiPropertyOptional({type:Number}) durationMinutes?: number; @ApiPropertyOptional({type:Number}) lateMinutes?: number;
 @ApiPropertyOptional({enum:['QR','Manual','Biometric']}) checkInMethod?: string;
}
export { ManagerAttendanceMarkAttendanceResponseDto as AttendanceMarkAttendanceResponseDto };
