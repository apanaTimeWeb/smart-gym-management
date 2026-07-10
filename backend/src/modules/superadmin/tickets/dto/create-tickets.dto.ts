import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ description: 'Placeholder field for Ticket' })
  @IsString()
  @IsOptional()
  name?: string;
}
