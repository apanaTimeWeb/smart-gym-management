import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateMigrationsService } from '../services/create-migrations.service';

@ApiTags('Migrations')
@Controller('migrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateMigrationsController {
  constructor(private readonly migrationsService: CreateMigrationsService) {}
  
  @Post()
  async execute() {
    return this.migrationsService.execute();
  }
}
