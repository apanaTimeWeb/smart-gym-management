import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateBroadcastsService } from '../services/update-broadcasts.service';

@ApiTags('Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateBroadcastsController {
  constructor(private readonly broadcastsService: UpdateBroadcastsService) {}
  
  @Patch()
  async execute() {
    return this.broadcastsService.execute();
  }
}
