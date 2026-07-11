import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateBackupsService } from '../services/create-backups.service';

@ApiTags('Backups')
@Controller('backups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateBackupsController {
  constructor(private readonly backupsService: CreateBackupsService) {}
  
  @Post()
  async execute() {
    return this.backupsService.execute();
  }
}
