// RESPONSIBILITY: Validates SuperadminTicketsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { TicketsStatus } from '@/backend_superadmin/superadmin_modules/tickets/dtos/superadmin-tickets-update.dto';

export class SuperadminTicketsStatusDto {
  @IsEnum(TicketsStatus)
  status!: TicketsStatus;
}