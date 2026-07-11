import { Controller, Get, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindBroadcastsService } from '../services/find-broadcasts.service';


@ApiTags('Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindBroadcastsController {
  constructor(private readonly service: FindBroadcastsService) {}
  
  @Get()
  async executeAll() {
    return this.service.execute();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find Broadcast' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
