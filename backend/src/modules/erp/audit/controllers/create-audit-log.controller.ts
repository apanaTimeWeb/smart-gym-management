import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateAuditService } from '../services/create-audit.service';
import { AuditLog } from '../entities/audit-log.entity';

@ApiTags('ERP Audit')
@Controller('audit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateAuditLogController {
  constructor(private readonly service: CreateAuditService) {}

  @Post()
  @ApiOperation({ summary: 'Create Audit Log' })
  @ApiResponse({ status: HttpStatus.CREATED })
  async execute(@Body() dto: Partial<AuditLog>): Promise<{ success: boolean; message: string }> {
    return this.service.createAuditLog(dto);
  }
}
