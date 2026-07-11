import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindBackupsService } from '../services/find-backups.service';

@ApiTags('Backups')
@Controller('backups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindBackupsController {
  constructor(private readonly backupsService: FindBackupsService) {}
  
  @Get()
  async execute() {
    return this.backupsService.execute();
  }
}
