import { Controller, Get, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { SystemService } from '../services/system.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

/**
 * SystemController — read-only system health monitoring.
 * System health is computed in real-time, not stored or managed via CRUD.
 */
@ApiTags('Superadmin: System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  @ApiOperation({ summary: 'Get system health status for all services' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.systemService.findAll();
  }

  @Get('health')
  @ApiOperation({ summary: 'Get lightweight system health probe (Kubernetes liveness)' })
  @ApiResponse({ status: HttpStatus.OK })
  getHealthProbe() {
    return this.systemService.getHealthProbe();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get health status for a specific service by service name' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.systemService.findOne(id);
  }
}
