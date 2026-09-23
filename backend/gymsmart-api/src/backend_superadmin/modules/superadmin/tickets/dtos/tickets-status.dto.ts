// RESPONSIBILITY: Validates TicketsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { TicketsStatus } from '@/backend_superadmin/modules/superadmin/tickets/dtos/tickets-update.dto';

export class TicketsStatusDto {
  @IsEnum(TicketsStatus)
  status!: TicketsStatus;
}