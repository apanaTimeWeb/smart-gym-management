import { Controller, Get, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { InfrastructureService } from '../services/infrastructure.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

/**
 * InfrastructureController — read-only infrastructure monitoring.
 * Infrastructure nodes are managed externally (Terraform/cloud console), not via this API.
 */
@ApiTags('Superadmin: Infrastructure')
@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  @Get()
  @ApiOperation({ summary: 'Get all infrastructure nodes with live resource metrics' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.infrastructureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific infrastructure node' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.infrastructureService.findOne(id);
  }
}
