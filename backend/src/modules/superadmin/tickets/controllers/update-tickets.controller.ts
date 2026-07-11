import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateTicketsService } from '../services/update-tickets.service';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateTicketsController {
  constructor(private readonly ticketsService: UpdateTicketsService) {}
  
  @Patch()
  async execute() {
    return this.ticketsService.execute();
  }
}
