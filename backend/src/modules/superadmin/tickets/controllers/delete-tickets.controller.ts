import { Controller, Delete, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteTicketsService } from '../services/delete-tickets.service';


@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteTicketsController {
  constructor(private readonly service: DeleteTicketsService) {}
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete SupportTicket' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
