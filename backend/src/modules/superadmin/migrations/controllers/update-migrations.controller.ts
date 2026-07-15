import { Controller, Patch, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateMigrationsService } from '../services/update-migrations.service';
import { UpdateSchemaMigrationDto } from '../dto/update-migrations.dto';

@ApiTags('Migrations')
@Controller('migrations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateMigrationsController {
  constructor(private readonly service: UpdateMigrationsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update SchemaMigration' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateSchemaMigrationDto) {
    return this.service.execute(id, dto);
  }
}
