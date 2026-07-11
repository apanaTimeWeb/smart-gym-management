import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateBackupsService } from '../services/update-backups.service';

@ApiTags('Backups')
@Controller('backups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateBackupsController {
  constructor(private readonly backupsService: UpdateBackupsService) {}
  
  @Patch()
  async execute() {
    return this.backupsService.execute();
  }
}
