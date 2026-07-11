import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateBroadcastsService } from '../services/create-broadcasts.service';

@ApiTags('Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateBroadcastsController {
  constructor(private readonly broadcastsService: CreateBroadcastsService) {}
  
  @Post()
  async execute() {
    return this.broadcastsService.execute();
  }
}
