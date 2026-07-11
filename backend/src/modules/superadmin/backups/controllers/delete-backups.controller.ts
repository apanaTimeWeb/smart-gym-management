import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteBackupsService } from '../services/delete-backups.service';

@ApiTags('Backups')
@Controller('backups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteBackupsController {
  constructor(private readonly backupsService: DeleteBackupsService) {}
  
  @Delete()
  async execute() {
    return this.backupsService.execute();
  }
}
