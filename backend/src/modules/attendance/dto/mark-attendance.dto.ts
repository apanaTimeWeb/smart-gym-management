import {
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceType } from '@/modules/attendance/utils/attendance.enums';

export class MarkAttendanceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  memberId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  staffId?: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  checkIn?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  checkOut?: string;

  @ApiProperty({ enum: AttendanceType })
  @IsEnum(AttendanceType)
  type: AttendanceType;
}
