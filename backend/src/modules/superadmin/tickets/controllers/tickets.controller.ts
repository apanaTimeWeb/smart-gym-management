import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto } from '../dto/create-tickets.dto';
import { UpdateTicketDto } from '../dto/update-tickets.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Ticket' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateTicketDto) {
    return this.ticketsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Tickets' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Ticket' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Ticket' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Ticket' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
