import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteMigrationsService } from '../services/delete-migrations.service';

@ApiTags('Migrations')
@Controller('migrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteMigrationsController {
  constructor(private readonly migrationsService: DeleteMigrationsService) {}
  
  @Delete()
  async execute() {
    return this.migrationsService.execute();
  }
}
