import { Controller, Post, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateBroadcastsService } from '../services/create-broadcasts.service';
import { CreateBroadcastDto } from '../dto/create-broadcasts.dto';

@ApiTags('Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateBroadcastsController {
  constructor(private readonly service: CreateBroadcastsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create Broadcast' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateBroadcastDto) {
    return this.service.execute(dto);
  }
}
