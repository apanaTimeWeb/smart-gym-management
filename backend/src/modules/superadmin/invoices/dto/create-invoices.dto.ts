import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({ description: 'Placeholder field for Invoice' })
  @IsString()
  @IsOptional()
  name?: string;
}
