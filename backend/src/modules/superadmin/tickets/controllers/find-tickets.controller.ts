import { Controller, Get, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindTicketsService } from '../services/find-tickets.service';


@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindTicketsController {
  constructor(private readonly service: FindTicketsService) {}
  
  @Get()
  async executeAll() {
    return this.service.execute();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find SupportTicket' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
