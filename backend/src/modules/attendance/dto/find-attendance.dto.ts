import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindAttendanceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  memberId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  staffId?: number;
}
