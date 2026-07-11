import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { TicketStatus, TicketPriority } from '../tickets.interfaces';

export class CreateSupportTicketDto {
  @IsString()
  @IsOptional()
  tenantName?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  status?: TicketStatus;

  @IsString()
  @IsOptional()
  priority?: TicketPriority;

}
