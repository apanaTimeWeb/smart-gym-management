import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindMigrationsService } from '../services/find-migrations.service';

@ApiTags('Migrations')
@Controller('migrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindMigrationsController {
  constructor(private readonly migrationsService: FindMigrationsService) {}
  
  @Get()
  async execute() {
    return this.migrationsService.execute();
  }
}
