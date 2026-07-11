import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteBroadcastsService } from '../services/delete-broadcasts.service';

@ApiTags('Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteBroadcastsController {
  constructor(private readonly broadcastsService: DeleteBroadcastsService) {}
  
  @Delete()
  async execute() {
    return this.broadcastsService.execute();
  }
}
