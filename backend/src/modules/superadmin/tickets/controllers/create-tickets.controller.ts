import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateTicketsService } from '../services/create-tickets.service';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateTicketsController {
  constructor(private readonly ticketsService: CreateTicketsService) {}
  
  @Post()
  async execute() {
    return this.ticketsService.execute();
  }
}
