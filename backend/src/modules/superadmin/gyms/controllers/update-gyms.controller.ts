import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateGymsService } from '../services/update-gyms.service';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateGymsController {
  constructor(private readonly gymsService: UpdateGymsService) {}
  
  @Patch()
  async execute() {
    return this.gymsService.execute();
  }
}
