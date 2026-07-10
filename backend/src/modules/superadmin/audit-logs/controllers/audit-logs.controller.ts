import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { AuditLogsService } from '../services/audit-logs.service';
import { CreateAuditLogDto } from '../dto/create-audit-logs.dto';
import { UpdateAuditLogDto } from '../dto/update-audit-logs.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: AuditLogs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new AuditLog' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateAuditLogDto) {
    return this.auditLogsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all AuditLogs' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.auditLogsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific AuditLog' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.auditLogsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific AuditLog' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateAuditLogDto) {
    return this.auditLogsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific AuditLog' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.auditLogsService.remove(id);
  }
}
