import { Controller, Patch, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateBroadcastsService } from '../services/update-broadcasts.service';
import { UpdateBroadcastDto } from '../dto/update-broadcasts.dto';

@ApiTags('Broadcasts')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateBroadcastsController {
  constructor(private readonly service: UpdateBroadcastsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update Broadcast' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateBroadcastDto) {
    return this.service.execute(id, dto);
  }
}
