import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { TicketStatus, TicketPriority } from '../tickets.interfaces';

export class CreateSupportTicketDto {
  @IsString()
  tenantName: string;

  @IsString()
  subject: string;

  @IsString()
  @IsOptional()
  status?: TicketStatus;

  @IsString()
  priority: TicketPriority;

}
