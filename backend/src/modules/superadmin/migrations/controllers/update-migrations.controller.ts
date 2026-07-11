import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateMigrationsService } from '../services/update-migrations.service';

@ApiTags('Migrations')
@Controller('migrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateMigrationsController {
  constructor(private readonly migrationsService: UpdateMigrationsService) {}
  
  @Patch()
  async execute() {
    return this.migrationsService.execute();
  }
}
