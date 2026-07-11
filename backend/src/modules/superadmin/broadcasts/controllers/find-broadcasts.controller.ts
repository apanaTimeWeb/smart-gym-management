import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindBroadcastsService } from '../services/find-broadcasts.service';

@ApiTags('Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindBroadcastsController {
  constructor(private readonly broadcastsService: FindBroadcastsService) {}
  
  @Get()
  async execute() {
    return this.broadcastsService.execute();
  }
}
