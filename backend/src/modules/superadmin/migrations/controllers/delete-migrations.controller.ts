import { Controller, Delete, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteMigrationsService } from '../services/delete-migrations.service';


@ApiTags('Migrations')
@Controller('migrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteMigrationsController {
  constructor(private readonly service: DeleteMigrationsService) {}
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete SchemaMigration' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
