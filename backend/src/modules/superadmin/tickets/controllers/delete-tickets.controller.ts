import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteTicketsService } from '../services/delete-tickets.service';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteTicketsController {
  constructor(private readonly ticketsService: DeleteTicketsService) {}
  
  @Delete()
  async execute() {
    return this.ticketsService.execute();
  }
}
