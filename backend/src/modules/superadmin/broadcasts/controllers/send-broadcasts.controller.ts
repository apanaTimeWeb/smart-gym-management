import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { SendBroadcastsService } from '../services/send-broadcasts.service';

@ApiTags('Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SendBroadcastsController {
  constructor(private readonly service: SendBroadcastsService) {}
  
  @Post(':id/send')
  async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
