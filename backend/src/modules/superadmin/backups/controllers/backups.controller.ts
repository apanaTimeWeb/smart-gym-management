import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { BackupsService } from '../services/backups.service';
import { CreateBackupDto } from '../dto/create-backups.dto';
import { UpdateBackupDto } from '../dto/update-backups.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Backups')
@Controller('backups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BackupsController {
  constructor(private readonly backupsService: BackupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Backup' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateBackupDto) {
    return this.backupsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Backups' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.backupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Backup' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.backupsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Backup' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateBackupDto) {
    return this.backupsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Backup' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.backupsService.remove(id);
  }
}
