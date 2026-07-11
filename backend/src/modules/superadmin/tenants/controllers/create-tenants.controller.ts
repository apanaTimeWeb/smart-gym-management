import { Controller, Post, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateTenantsService } from '../services/create-tenants.service';
import { CreateTenantDto } from '../dto/create-tenants.dto';

@ApiTags('Tenants')
@Controller('tenants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateTenantsController {
  constructor(private readonly service: CreateTenantsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create Tenant' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateTenantDto) {
    return this.service.execute(dto);
  }
}
