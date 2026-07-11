import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteGymsService } from '../services/delete-gyms.service';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteGymsController {
  constructor(private readonly gymsService: DeleteGymsService) {}
  
  @Delete()
  async execute() {
    return this.gymsService.execute();
  }
}
