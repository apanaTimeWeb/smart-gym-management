import { Controller, Patch, Get, Post, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateTenantsService } from '../services/update-tenants.service';
import { UpdateTenantDto } from '../dto/update-tenants.dto';

@ApiTags('Tenants')
@Controller('tenants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateTenantsController {
  constructor(private readonly service: UpdateTenantsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update Tenant' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.execute(id, dto);
  }
}
