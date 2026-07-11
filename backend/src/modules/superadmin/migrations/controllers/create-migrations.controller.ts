import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateMigrationsService } from '../services/create-migrations.service';
import { CreateSchemaMigrationDto } from '../dto/create-migrations.dto';

@ApiTags('Migrations')
@Controller('migrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateMigrationsController {
  constructor(private readonly service: CreateMigrationsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create SchemaMigration' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateSchemaMigrationDto) {
    return this.service.execute(dto);
  }
}
