import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { BroadcastsService } from '../services/broadcasts.service';
import { CreateBroadcastDto } from '../dto/create-broadcasts.dto';
import { UpdateBroadcastDto } from '../dto/update-broadcasts.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BroadcastsController {
  constructor(private readonly broadcastsService: BroadcastsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Broadcast' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateBroadcastDto) {
    return this.broadcastsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Broadcasts' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.broadcastsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Broadcast' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.broadcastsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Broadcast' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateBroadcastDto) {
    return this.broadcastsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Broadcast' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.broadcastsService.remove(id);
  }
}
