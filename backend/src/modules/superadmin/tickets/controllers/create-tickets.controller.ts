import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateTicketsService } from '../services/create-tickets.service';
import { CreateSupportTicketDto } from '../dto/create-tickets.dto';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateTicketsController {
  constructor(private readonly service: CreateTicketsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create SupportTicket' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateSupportTicketDto) {
    return this.service.execute(dto);
  }
}
