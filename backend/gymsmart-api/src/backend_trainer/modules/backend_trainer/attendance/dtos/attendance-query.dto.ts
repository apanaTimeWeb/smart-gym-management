// RESPONSIBILITY: Validates attendance request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → AttendanceQueryDto → service.

import { CorePaginationQueryDto } from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { AttendanceCheckInMethod, AttendanceRecordType } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-enums';
import { Type } from 'class-transformer'; import { IsBoolean, IsEnum, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID } from 'class-validator';
export class AttendanceQueryDto extends CorePaginationQueryDto {
    @IsOptional() @IsString() search?:string;
    @IsIn(['asc','desc','ASC','DESC']) sortDirection='desc';
    @IsOptional() @IsDateString() date?:string; @IsOptional() @IsEnum(AttendanceRecordType) type?:AttendanceRecordType; @IsOptional() @IsUUID() staffId?:string; @IsIn(['name','type','date','checkIn','checkOut','durationMinutes','checkInMethod']) sortBy='date';

}
