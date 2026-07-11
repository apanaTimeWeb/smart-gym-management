import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindTicketsService } from '../services/find-tickets.service';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindTicketsController {
  constructor(private readonly ticketsService: FindTicketsService) {}
  
  @Get()
  async execute() {
    return this.ticketsService.execute();
  }
}
