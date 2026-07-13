import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindAttendanceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  memberId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  staffId?: string;

  @ApiProperty({ required: false, enum: ['MEMBER', 'STAFF'] })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 50;
}
