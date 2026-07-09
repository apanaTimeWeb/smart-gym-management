import { IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceType } from '@/common/enums/database.enums';

export class MarkAttendanceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  memberId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  staffId?: number;

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
