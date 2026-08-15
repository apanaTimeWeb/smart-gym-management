import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePayrollStatusDto {
  @ApiProperty()
  @IsString()
  status: string;
}
