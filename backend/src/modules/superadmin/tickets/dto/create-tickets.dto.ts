import {
  IsString,
  IsEnum,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TicketStatus, TicketPriority } from '../entities/tickets.entity';

export class CreateTicketDto {
  @ApiProperty({ description: 'Name of the gym tenant raising this ticket', example: 'Iron Forge Fitness' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  tenantName: string;

  @ApiPropertyOptional({ description: 'Internal tenant ID for cross-referencing' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ description: 'Brief subject/title of the support issue', example: 'WhatsApp Integration failing' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  subject: string;

  @ApiPropertyOptional({ description: 'Full description of the issue' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TicketStatus, default: TicketStatus.OPEN })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiPropertyOptional({ enum: TicketPriority, default: TicketPriority.MEDIUM })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiPropertyOptional({ description: 'Email of the support agent assigned to handle this ticket' })
  @IsOptional()
  @IsString()
  assignedTo?: string;
}
