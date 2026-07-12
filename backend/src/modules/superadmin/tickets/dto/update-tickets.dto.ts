import { PartialType } from '@nestjs/mapped-types';
import { CreateSupportTicketDto } from './create-tickets.dto';

export class UpdateSupportTicketDto extends PartialType(CreateSupportTicketDto) {}
