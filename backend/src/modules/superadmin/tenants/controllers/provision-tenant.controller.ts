import { Controller, Post, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ProvisionTenantService } from '../services/provision-tenant.service';
import { ProvisionTenantDto } from '../dto/provision-tenant.dto';
import { TENANTS_MESSAGES } from '../tenants.constants';

/**
 * TenantsController — handles low-level tenant infrastructure operations.
 * NOTE: Tenant CRUD (create, list, update, suspend) is handled by the Gyms module.
 * This controller exclusively deals with database provisioning (Rule 39: Database-per-Tenant).
 */
@ApiTags('Superadmin: Tenants')
@Controller('tenants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TenantsController {
  constructor(private readonly provisionTenantService: ProvisionTenantService) {}

  @Post('provision')
  @ApiOperation({
    summary: 'Provision a new tenant database',
    description:
      'Creates a new isolated PostgreSQL database for a gym tenant and runs all schema migrations on it. ' +
      'This implements Rule 39 (Database-per-Tenant Architecture). ' +
      'Call this endpoint immediately after a new gym is registered via POST /superadmin/gyms.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: TENANTS_MESSAGES.PROVISIONED_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Provisioning or migration failed',
  })
  async provision(@Body() dto: ProvisionTenantDto) {
    await this.provisionTenantService.provisionNewTenant(dto.tenantId);
    return {
      success: true,
      message: TENANTS_MESSAGES.PROVISIONED_SUCCESS,
      data: {
        tenantId: dto.tenantId,
        databaseName: `tenant_db_${dto.tenantId}`,
        provisionedAt: new Date().toISOString(),
      },
    };
  }
}
