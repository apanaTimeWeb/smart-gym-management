import { Controller, Patch, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateTicketsService } from '../services/update-tickets.service';
import { UpdateSupportTicketDto } from '../dto/update-tickets.dto';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateTicketsController {
  constructor(private readonly service: UpdateTicketsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update SupportTicket' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateSupportTicketDto) {
    return this.service.execute(id, dto);
  }
}
