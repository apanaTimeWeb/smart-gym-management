import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { MigrationsService } from '../services/migrations.service';
import { CreateMigrationDto } from '../dto/create-migrations.dto';
import { UpdateMigrationDto } from '../dto/update-migrations.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Migrations')
@Controller('migrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MigrationsController {
  constructor(private readonly migrationsService: MigrationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Migration' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateMigrationDto) {
    return this.migrationsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Migrations' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.migrationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Migration' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.migrationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Migration' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateMigrationDto) {
    return this.migrationsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Migration' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.migrationsService.remove(id);
  }
}
