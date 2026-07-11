import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuditLogsService } from '../services/audit-logs.service';
import { CreateAuditLogDto } from '../dto/create-audit-logs.dto';
import { CreateGlobalAuditLogDto } from '../dto/create-global-audit-log.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Audit Logs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  /**
   * Primary endpoint — returns both tenant logs and global logs.
   * Consumed by the frontend /superadmin/audit-logs page.
   */
  @Get()
  @ApiOperation({ summary: 'Get all Audit Logs (tenant + global)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns { tenantLogs[], globalLogs[] }' })
  findAll() {
    return this.auditLogsService.findAll();
  }

  // ─── Per-Tenant Audit Log Routes ─────────────────────────────────────────────

  @Get('tenant')
  @ApiOperation({ summary: 'Get tenant-level audit logs (optionally filtered by tenantId)' })
  @ApiQuery({ name: 'tenantId', required: false, description: 'Filter by specific tenant ID' })
  @ApiResponse({ status: HttpStatus.OK })
  findAllTenantLogs(@Query('tenantId') tenantId?: string) {
    return this.auditLogsService.findAllTenantLogs(tenantId);
  }

  @Post('tenant')
  @ApiOperation({ summary: 'Record a new tenant-level audit log entry' })
  @ApiResponse({ status: HttpStatus.CREATED })
  createTenantLog(@Body() createDto: CreateAuditLogDto) {
    return this.auditLogsService.createTenantLog(createDto);
  }

  // ─── Global (Superadmin) Audit Log Routes ────────────────────────────────────

  @Get('global')
  @ApiOperation({ summary: 'Get global superadmin-level audit logs' })
  @ApiResponse({ status: HttpStatus.OK })
  findAllGlobalLogs() {
    return this.auditLogsService.findAllGlobalLogs();
  }

  @Post('global')
  @ApiOperation({ summary: 'Record a new global superadmin audit log entry' })
  @ApiResponse({ status: HttpStatus.CREATED })
  createGlobalLog(@Body() createDto: CreateGlobalAuditLogDto) {
    return this.auditLogsService.createGlobalLog(createDto);
  }

  // ─── Generic Find One ────────────────────────────────────────────────────────

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific audit log entry by ID' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.auditLogsService.findOne(id);
  }
}
